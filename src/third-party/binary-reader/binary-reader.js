// Protocol Buffers - Google's data interchange format
// Copyright 2008 Google Inc.  All rights reserved.
// https://developers.google.com/protocol-buffers/
//
// Redistribution and use in source and binary forms, with or without
// modification, are permitted provided that the following conditions are
// met:
//
//     * Redistributions of source code must retain the above copyright
// notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above
// copyright notice, this list of conditions and the following disclaimer
// in the documentation and/or other materials provided with the
// distribution.
//     * Neither the name of Google Inc. nor the names of its
// contributors may be used to endorse or promote products derived from
// this software without specific prior written permission.
//
// THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
// "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
// LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
// A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
// OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
// SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
// LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
// DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
// THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
// (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
// OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

/**
 * @fileoverview This file contains utilities for converting binary,
 * wire-format protocol buffers into Javascript data structures.
 *
 * jspb's BinaryReader class wraps the BinaryDecoder class to add methods
 * that understand the protocol buffer syntax and can do the type checking and
 * bookkeeping necessary to parse trees of nested messages.
 *
 * Major caveat - Users of this library _must_ keep their Javascript proto
 * parsing code in sync with the original .proto file - presumably you'll be
 * using the typed jspb code generator, but if you bypass that you'll need
 * to keep things in sync by hand.
 *
 * @author aappleby@google.com (Austin Appleby)
 */
// const goog = require('clo');
require('google-closure-library');
const goog = global.goog;
goog.require('goog.asserts');
// const jspb = goog;

const jspb = Object.create({BinaryConstants: {}});
// jspb.BinaryConstants =
/**
 * Field type codes, taken from proto2/public/wire_format_lite.h.
 * @enum {number}
 */
jspb.BinaryConstants.FieldType = {
    INVALID: -1,
    DOUBLE: 1,
    FLOAT: 2,
    INT64: 3,
    UINT64: 4,
    INT32: 5,
    FIXED64: 6,
    FIXED32: 7,
    BOOL: 8,
    STRING: 9,
    GROUP: 10,
    MESSAGE: 11,
    BYTES: 12,
    UINT32: 13,
    ENUM: 14,
    SFIXED32: 15,
    SFIXED64: 16,
    SINT32: 17,
    SINT64: 18,

    // Extended types for Javascript

    FHASH64: 30, // 64-bit hash string, fixed-length encoding.
    VHASH64: 31  // 64-bit hash string, varint encoding.
};


/**
 * Wire-format type codes, taken from proto2/public/wire_format_lite.h.
 * @enum {number}
 */
jspb.BinaryConstants.WireType = {
    INVALID: -1,
    VARINT: 0,
    FIXED64: 1,
    DELIMITED: 2,
    START_GROUP: 3,
    END_GROUP: 4,
    FIXED32: 5
};


/**
 * Global pool of BinaryReader instances.
 * @private {!Array<!jspb.BinaryReader>}
 */
let instanceCache_ = [];

/**
 /**
 * Pops an instance off the instance cache, or creates one if the cache is
 * empty.
 * @param {jspb.ByteSource=} opt_bytes The bytes we're reading from.
 * @param {number=} opt_start The optional offset to start reading at.
 * @param {number=} opt_length The optional length of the block to read -
 *     we'll throw an assertion if we go off the end of the block.
 * @return {!jspb.BinaryReader}
 */
function alloc(opt_bytes, opt_start, opt_length) {
    if (instanceCache_.length) {
        var newReader = instanceCache_.pop();
        if (opt_bytes) {
            newReader.decoder_.setBlock(opt_bytes, opt_start, opt_length);
        }
        return newReader;
    } else {
        return new BinaryReader(opt_bytes, opt_start, opt_length);
    }
}


class BinaryReader {

    /**
     * BinaryReader implements the decoders for all the wire types specified in
     * https://developers.google.com/protocol-buffers/docs/encoding.
     *
     * @param {jspb.ByteSource=} opt_bytes The bytes we're reading from.
     * @param {number=} opt_start The optional offset to start reading at.
     * @param {number=} opt_length The optional length of the block to read -
     *     we'll throw an assertion if we go off the end of the block.
     * @constructor
     * @struct
     */
    constructor(opt_bytes, opt_start, opt_length) {
        /**
         * Wire-format decoder.
         * @private {!jspb.BinaryDecoder}
         */
        this.decoder_ = BinaryDecoder.alloc(opt_bytes, opt_start, opt_length);

        /**
         * Cursor immediately before the field tag.
         * @private {number}
         */
        this.fieldCursor_ = this.decoder_.getCursor();

        /**
         * Field number of the next field in the buffer, filled in by nextField().
         * @private {number}
         */
        this.nextField_ = jspb.BinaryConstants.INVALID_FIELD_NUMBER;

        /**
         * Wire type of the next proto field in the buffer, filled in by
         * nextField().
         * @private {jspb.BinaryConstants.WireType}
         */
        this.nextWireType_ = jspb.BinaryConstants.WireType.INVALID;

        /**
         * Set to true if this reader encountered an error due to corrupt data.
         * @private {boolean}
         */
        this.error_ = false;

        /**
         * User-defined reader callbacks.
         * @private {?Object<string, function(!jspb.BinaryReader):*>}
         */
        this.readCallbacks_ = null;
    }

    /**
     * Puts this instance back in the instance cache.
     */
    free() {
        this.decoder_.clear();
        this.nextField_ = jspb.BinaryConstants.INVALID_FIELD_NUMBER;
        this.nextWireType_ = jspb.BinaryConstants.WireType.INVALID;
        this.error_ = false;
        this.readCallbacks_ = null;

        if (instanceCache_.length < 100) {
            instanceCache_.push(this);
        }
    }


    /**
     * Returns the cursor immediately before the current field's tag.
     * @return {number} The internal read cursor.
     */
    getFieldCursor() {
        return this.fieldCursor_;
    }


    /**
     * Returns the internal read cursor.
     * @return {number} The internal read cursor.
     */
    getCursor() {
        return this.decoder_.getCursor();
    }


    /**
     * Returns the raw buffer.
     * @return {?Uint8Array} The raw buffer.
     */
    getBuffer() {
        return this.decoder_.getBuffer();
    }


    /**
     * @return {number} The field number of the next field in the buffer, or
     *     INVALID_FIELD_NUMBER if there is no next field.
     */
    getFieldNumber() {
        return this.nextField_;
    }


    /**
     * @return {jspb.BinaryConstants.WireType} The wire type of the next field
     *     in the stream, or WireType.INVALID if there is no next field.
     */
    getWireType() {
        return this.nextWireType_;
    }


    /**
     * @return {boolean} Whether the current wire type is an end-group tag. Used as
     * an exit condition in decoder loops in generated code.
     */
    isEndGroup() {
        return this.nextWireType_ === jspb.BinaryConstants.WireType.END_GROUP;
    }


    /**
     * Returns true if this reader hit an error due to corrupt data.
     * @return {boolean}
     */
    getError() {
        return this.error_ || this.decoder_.getError();
    }


    /**
     * Points this reader at a new block of bytes.
     * @param {!Uint8Array} bytes The block of bytes we're reading from.
     * @param {number} start The offset to start reading at.
     * @param {number} length The length of the block to read.
     */
    setBlock(bytes, start, length) {
        this.decoder_.setBlock(bytes, start, length);
        this.nextField_ = jspb.BinaryConstants.INVALID_FIELD_NUMBER;
        this.nextWireType_ = jspb.BinaryConstants.WireType.INVALID;
    }


    /**
     * Rewinds the stream cursor to the beginning of the buffer and resets all
     * internal state.
     */
    reset() {
        this.decoder_.reset();
        this.nextField_ = jspb.BinaryConstants.INVALID_FIELD_NUMBER;
        this.nextWireType_ = jspb.BinaryConstants.WireType.INVALID;
    }


    /**
     * Advances the stream cursor by the given number of bytes.
     * @param {number} count The number of bytes to advance by.
     */
    advance(count) {
        this.decoder_.advance(count);
    }


    /**
     * Reads the next field header in the stream if there is one, returns true if
     * we saw a valid field header or false if we've read the whole stream.
     * Throws an error if we encountered a deprecated START_GROUP/END_GROUP field.
     * @return {boolean} True if the stream contains more fields.
     */
    nextField() {
        // If we're at the end of the block, there are no more fields.
        if (this.decoder_.atEnd()) {
            return false;
        }

        // If we hit an error decoding the previous field, stop now before we
        // try to decode anything else
        if (this.getError()) {
            goog.asserts.fail('Decoder hit an error');
            return false;
        }

        // Otherwise just read the header of the next field.
        this.fieldCursor_ = this.decoder_.getCursor();
        var header = this.decoder_.readUnsignedVarint32();

        var nextField = header >>> 3;
        var nextWireType = /** @type {jspb.BinaryConstants.WireType} */
            (header & 0x7);

        // If the wire type isn't one of the valid ones, something's broken.
        if (nextWireType !== jspb.BinaryConstants.WireType.VARINT &&
            nextWireType !== jspb.BinaryConstants.WireType.FIXED32 &&
            nextWireType !== jspb.BinaryConstants.WireType.FIXED64 &&
            nextWireType !== jspb.BinaryConstants.WireType.DELIMITED &&
            nextWireType !== jspb.BinaryConstants.WireType.START_GROUP &&
            nextWireType !== jspb.BinaryConstants.WireType.END_GROUP) {
            goog.asserts.fail(
                'Invalid wire type: %s (at position %s)', nextWireType,
                this.fieldCursor_);
            this.error_ = true;
            return false;
        }

        this.nextField_ = nextField;
        this.nextWireType_ = nextWireType;

        return true;
    }


    /**
     * Winds the reader back to just before this field's header.
     */
    unskipHeader() {
        this.decoder_.unskipVarint((this.nextField_ << 3) | this.nextWireType_);
    }


    /**
     * Skips all contiguous fields whose header matches the one we just read.
     */
    skipMatchingFields() {
        var field = this.nextField_;
        this.unskipHeader();

        while (this.nextField() && (this.getFieldNumber() === field)) {
            this.skipField();
        }

        if (!this.decoder_.atEnd()) {
            this.unskipHeader();
        }
    }


    /**
     * Skips over the next varint field in the binary stream.
     */
    skipVarintField() {
        if (this.nextWireType_ !== jspb.BinaryConstants.WireType.VARINT) {
            goog.asserts.fail('Invalid wire type for skipVarintField');
            this.skipField();
            return;
        }

        this.decoder_.skipVarint();
    }


    /**
     * Skips over the next delimited field in the binary stream.
     */
    skipDelimitedField() {
        if (this.nextWireType_ !== jspb.BinaryConstants.WireType.DELIMITED) {
            goog.asserts.fail('Invalid wire type for skipDelimitedField');
            this.skipField();
            return;
        }

        var length = this.decoder_.readUnsignedVarint32();
        this.decoder_.advance(length);
    }


    /**
     * Skips over the next fixed32 field in the binary stream.
     */
    skipFixed32Field() {
        if (this.nextWireType_ !== jspb.BinaryConstants.WireType.FIXED32) {
            goog.asserts.fail('Invalid wire type for skipFixed32Field');
            this.skipField();
            return;
        }

        this.decoder_.advance(4);
    }


    /**
     * Skips over the next fixed64 field in the binary stream.
     */
    skipFixed64Field() {
        if (this.nextWireType_ !== jspb.BinaryConstants.WireType.FIXED64) {
            goog.asserts.fail('Invalid wire type for skipFixed64Field');
            this.skipField();
            return;
        }

        this.decoder_.advance(8);
    }


    /**
     * Skips over the next group field in the binary stream.
     */
    skipGroup() {
        var previousField = this.nextField_;
        for (; ;) {
            if (!this.nextField()) {
                goog.asserts.fail('Unmatched start-group tag: stream EOF');
                this.error_ = true;
                return;
            }
            if (this.nextWireType_ ===
                jspb.BinaryConstants.WireType.END_GROUP) {
                // Group end: check that it matches top-of-stack.
                if (this.nextField_ !== previousField) {
                    goog.asserts.fail('Unmatched end-group tag');
                    this.error_ = true;
                    return;
                }
                return;
            }
            this.skipField();
        }
    }


    /**
     * Skips over the next field in the binary stream - this is useful if we're
     * decoding a message that contain unknown fields.
     */
    skipField() {
        switch (this.nextWireType_) {
        case jspb.BinaryConstants.WireType.VARINT:
            this.skipVarintField();
            break;
        case jspb.BinaryConstants.WireType.FIXED64:
            this.skipFixed64Field();
            break;
        case jspb.BinaryConstants.WireType.DELIMITED:
            this.skipDelimitedField();
            break;
        case jspb.BinaryConstants.WireType.FIXED32:
            this.skipFixed32Field();
            break;
        case jspb.BinaryConstants.WireType.START_GROUP:
            this.skipGroup();
            break;
        default:
            goog.asserts.fail('Invalid wire encoding for field.');
        }
    }


    /**
     * Registers a user-defined read callback.
     * @param {string} callbackName
     * @param {function(!jspb.BinaryReader):*} callback
     */
    registerReadCallback(callbackName, callback) {
        if (goog.isNull(this.readCallbacks_)) {
            this.readCallbacks_ = {};
        }
        goog.asserts.assert(!this.readCallbacks_[callbackName]);
        this.readCallbacks_[callbackName] = callback;
    }


    /**
     * Runs a registered read callback.
     * @param {string} callbackName The name the callback is registered under.
     * @return {*} The value returned by the callback.
     */
    runReadCallback(callbackName) {
        goog.asserts.assert(!goog.isNull(this.readCallbacks_));
        var callback = this.readCallbacks_[callbackName];
        goog.asserts.assert(callback);
        return callback(this);
    }


    /**
     * Reads a field of any valid non-message type from the binary stream.
     * @param {jspb.BinaryConstants.FieldType} fieldType
     * @return {jspb.AnyFieldType}
     */
    readAny(fieldType) {
        this.nextWireType_ = jspb.BinaryConstants.FieldTypeToWireType(fieldType);
        var fieldTypes = jspb.BinaryConstants.FieldType;
        switch (fieldType) {
        case fieldTypes.DOUBLE:
            return this.readDouble();
        case fieldTypes.FLOAT:
            return this.readFloat();
        case fieldTypes.INT64:
            return this.readInt64();
        case fieldTypes.UINT64:
            return this.readUint64();
        case fieldTypes.INT32:
            return this.readInt32();
        case fieldTypes.FIXED64:
            return this.readFixed64();
        case fieldTypes.FIXED32:
            return this.readFixed32();
        case fieldTypes.BOOL:
            return this.readBool();
        case fieldTypes.STRING:
            return this.readString();
        case fieldTypes.GROUP:
            goog.asserts.fail('Group field type not supported in readAny()');
            return;
        case fieldTypes.MESSAGE:
            goog.asserts.fail('Message field type not supported in readAny()');
            return;
        case fieldTypes.BYTES:
            return this.readBytes();
        case fieldTypes.UINT32:
            return this.readUint32();
        case fieldTypes.ENUM:
            return this.readEnum();
        case fieldTypes.SFIXED32:
            return this.readSfixed32();
        case fieldTypes.SFIXED64:
            return this.readSfixed64();
        case fieldTypes.SINT32:
            return this.readSint32();
        case fieldTypes.SINT64:
            return this.readSint64();
        case fieldTypes.FHASH64:
            return this.readFixedHash64();
        case fieldTypes.VHASH64:
            return this.readVarintHash64();
        default:
            goog.asserts.fail('Invalid field type in readAny()');
        }
        return 0;
    }


    /**
     * Deserialize a proto into the provided message object using the provided
     * reader function. This function is templated as we currently have one client
     * who is using manual deserialization instead of the code-generated versions.
     * @template T
     * @param {T} message
     * @param {function(T, !jspb.BinaryReader)} reader
     */
    readMessage(message, reader) {
        goog.asserts.assert(
            this.nextWireType_ === jspb.BinaryConstants.WireType.DELIMITED);

        // Save the current endpoint of the decoder and move it to the end of the
        // embedded message.
        var oldEnd = this.decoder_.getEnd();
        var length = this.decoder_.readUnsignedVarint32();
        var newEnd = this.decoder_.getCursor() + length;
        this.decoder_.setEnd(newEnd);

        // Deserialize the embedded message.
        reader(message, this);

        // Advance the decoder past the embedded message and restore the endpoint.
        this.decoder_.setCursor(newEnd);
        this.decoder_.setEnd(oldEnd);
    }


    /**
     * Deserialize a proto into the provided message object using the provided
     * reader function, assuming that the message is serialized as a group
     * with the given tag.
     * @template T
     * @param {number} field
     * @param {T} message
     * @param {function(T, !jspb.BinaryReader)} reader
     */
    readGroup(field, message, reader) {
        // Ensure that the wire type is correct.
        goog.asserts.assert(
            this.nextWireType_ === jspb.BinaryConstants.WireType.START_GROUP);
        // Ensure that the field number is correct.
        goog.asserts.assert(this.nextField_ === field);

        // Deserialize the message. The deserialization will stop at an END_GROUP tag.
        reader(message, this);

        if (!this.error_ &&
            this.nextWireType_ !== jspb.BinaryConstants.WireType.END_GROUP) {
            goog.asserts.fail('Group submessage did not end with an END_GROUP tag');
            this.error_ = true;
        }
    }


    /**
     * Return a decoder that wraps the current delimited field.
     * @return {!jspb.BinaryDecoder}
     */
    getFieldDecoder() {
        goog.asserts.assert(
            this.nextWireType_ === jspb.BinaryConstants.WireType.DELIMITED);

        var length = this.decoder_.readUnsignedVarint32();
        var start = this.decoder_.getCursor();
        var end = start + length;

        var innerDecoder =
            jspb.BinaryDecoder.alloc(this.decoder_.getBuffer(), start, length);
        this.decoder_.setCursor(end);
        return innerDecoder;
    }


    /**
     * Reads a signed 32-bit integer field from the binary stream, or throws an
     * error if the next field in the stream is not of the correct wire type.
     *
     * @return {number} The value of the signed 32-bit integer field.
     */
    readInt32() {
        goog.asserts.assert(
            this.nextWireType_ === jspb.BinaryConstants.WireType.VARINT);
        return this.decoder_.readSignedVarint32();
    }


    /**
     * Reads a signed 32-bit integer field from the binary stream, or throws an
     * error if the next field in the stream is not of the correct wire type.
     *
     * Returns the value as a string.
     *
     * @return {string} The value of the signed 32-bit integer field as a decimal
     * string.
     */
    readInt32String() {
        goog.asserts.assert(
            this.nextWireType_ === jspb.BinaryConstants.WireType.VARINT);
        return this.decoder_.readSignedVarint32String();
    }


    /**
     * Reads a signed 64-bit integer field from the binary stream, or throws an
     * error if the next field in the stream is not of the correct wire type.
     *
     * @return {number} The value of the signed 64-bit integer field.
     */
    readInt64() {
        goog.asserts.assert(
            this.nextWireType_ === jspb.BinaryConstants.WireType.VARINT);
        return this.decoder_.readSignedVarint64();
    }


    /**
     * Reads a signed 64-bit integer field from the binary stream, or throws an
     * error if the next field in the stream is not of the correct wire type.
     *
     * Returns the value as a string.
     *
     * @return {string} The value of the signed 64-bit integer field as a decimal
     * string.
     */
    readInt64String() {
        goog.asserts.assert(
            this.nextWireType_ === jspb.BinaryConstants.WireType.VARINT);
        return this.decoder_.readSignedVarint64String();
    }


    /**
     * Reads an unsigned 32-bit integer field from the binary stream, or throws an
     * error if the next field in the stream is not of the correct wire type.
     *
     * @return {number} The value of the unsigned 32-bit integer field.
     */
    readUint32() {
        goog.asserts.assert(
            this.nextWireType_ === jspb.BinaryConstants.WireType.VARINT);
        return this.decoder_.readUnsignedVarint32();
    }


    /**
     * Reads an unsigned 32-bit integer field from the binary stream, or throws an
     * error if the next field in the stream is not of the correct wire type.
     *
     * Returns the value as a string.
     *
     * @return {string} The value of the unsigned 32-bit integer field as a decimal
     * string.
     */
    readUint32String() {
        goog.asserts.assert(
            this.nextWireType_ === jspb.BinaryConstants.WireType.VARINT);
        return this.decoder_.readUnsignedVarint32String();
    }


    /**
     * Reads an unsigned 64-bit integer field from the binary stream, or throws an
     * error if the next field in the stream is not of the correct wire type.
     *
     * @return {number} The value of the unsigned 64-bit integer field.
     */
    readUint64() {
        goog.asserts.assert(
            this.nextWireType_ === jspb.BinaryConstants.WireType.VARINT);
        return this.decoder_.readUnsignedVarint64();
    }


    /**
     * Reads an unsigned 64-bit integer field from the binary stream, or throws an
     * error if the next field in the stream is not of the correct wire type.
     *
     * Returns the value as a string.
     *
     * @return {string} The value of the unsigned 64-bit integer field as a decimal
     * string.
     */
    readUint64String() {
        goog.asserts.assert(
            this.nextWireType_ === jspb.BinaryConstants.WireType.VARINT);
        return this.decoder_.readUnsignedVarint64String();
    }


    /**
     * Reads a signed zigzag-encoded 32-bit integer field from the binary stream,
     * or throws an error if the next field in the stream is not of the correct
     * wire type.
     *
     * @return {number} The value of the signed 32-bit integer field.
     */
    readSint32() {
        goog.asserts.assert(
            this.nextWireType_ === jspb.BinaryConstants.WireType.VARINT);
        return this.decoder_.readZigzagVarint32();
    }


    /**
     * Reads a signed zigzag-encoded 64-bit integer field from the binary stream,
     * or throws an error if the next field in the stream is not of the correct
     * wire type.
     *
     * @return {number} The value of the signed 64-bit integer field.
     */
    readSint64() {
        goog.asserts.assert(
            this.nextWireType_ === jspb.BinaryConstants.WireType.VARINT);
        return this.decoder_.readZigzagVarint64();
    }


    /**
     * Reads a signed zigzag-encoded 64-bit integer field from the binary stream,
     * or throws an error if the next field in the stream is not of the correct
     * wire type.
     *
     * @return {string} The value of the signed 64-bit integer field as a decimal string.
     */
    readSint64String() {
        goog.asserts.assert(
            this.nextWireType_ === jspb.BinaryConstants.WireType.VARINT);
        return this.decoder_.readZigzagVarint64String();
    }


    /**
     * Reads an unsigned 32-bit fixed-length integer fiield from the binary stream,
     * or throws an error if the next field in the stream is not of the correct
     * wire type.
     *
     * @return {number} The value of the double field.
     */
    readFixed32() {
        goog.asserts.assert(
            this.nextWireType_ === jspb.BinaryConstants.WireType.FIXED32);
        return this.decoder_.readUint32();
    }


    /**
     * Reads an unsigned 64-bit fixed-length integer fiield from the binary stream,
     * or throws an error if the next field in the stream is not of the correct
     * wire type.
     *
     * @return {number} The value of the float field.
     */
    readFixed64() {
        goog.asserts.assert(
            this.nextWireType_ === jspb.BinaryConstants.WireType.FIXED64);
        return this.decoder_.readUint64();
    }


    /**
     * Reads a signed 64-bit integer field from the binary stream as a string, or
     * throws an error if the next field in the stream is not of the correct wire
     * type.
     *
     * Returns the value as a string.
     *
     * @return {string} The value of the unsigned 64-bit integer field as a decimal
     * string.
     */
    readFixed64String() {
        goog.asserts.assert(
            this.nextWireType_ === jspb.BinaryConstants.WireType.FIXED64);
        return this.decoder_.readUint64String();
    }


    /**
     * Reads a signed 32-bit fixed-length integer fiield from the binary stream, or
     * throws an error if the next field in the stream is not of the correct wire
     * type.
     *
     * @return {number} The value of the signed 32-bit integer field.
     */
    readSfixed32() {
        goog.asserts.assert(
            this.nextWireType_ === jspb.BinaryConstants.WireType.FIXED32);
        return this.decoder_.readInt32();
    }


    /**
     * Reads a signed 32-bit fixed-length integer fiield from the binary stream, or
     * throws an error if the next field in the stream is not of the correct wire
     * type.
     *
     * @return {string} The value of the signed 32-bit integer field as a decimal
     * string.
     */
    readSfixed32String() {
        goog.asserts.assert(
            this.nextWireType_ === jspb.BinaryConstants.WireType.FIXED32);
        return this.decoder_.readInt32().toString();
    }


    /**
     * Reads a signed 64-bit fixed-length integer fiield from the binary stream, or
     * throws an error if the next field in the stream is not of the correct wire
     * type.
     *
     * @return {number} The value of the sfixed64 field.
     */
    readSfixed64() {
        goog.asserts.assert(
            this.nextWireType_ === jspb.BinaryConstants.WireType.FIXED64);
        return this.decoder_.readInt64();
    }


    /**
     * Reads a signed 64-bit fixed-length integer fiield from the binary stream, or
     * throws an error if the next field in the stream is not of the correct wire
     * type.
     *
     * Returns the value as a string.
     *
     * @return {string} The value of the sfixed64 field as a decimal string.
     */
    readSfixed64String() {
        goog.asserts.assert(
            this.nextWireType_ === jspb.BinaryConstants.WireType.FIXED64);
        return this.decoder_.readInt64String();
    }


    /**
     * Reads a 32-bit floating-point field from the binary stream, or throws an
     * error if the next field in the stream is not of the correct wire type.
     *
     * @return {number} The value of the float field.
     */
    readFloat() {
        goog.asserts.assert(
            this.nextWireType_ === jspb.BinaryConstants.WireType.FIXED32);
        return this.decoder_.readFloat();
    }


    /**
     * Reads a 64-bit floating-point field from the binary stream, or throws an
     * error if the next field in the stream is not of the correct wire type.
     *
     * @return {number} The value of the double field.
     */
    readDouble() {
        goog.asserts.assert(
            this.nextWireType_ === jspb.BinaryConstants.WireType.FIXED64);
        return this.decoder_.readDouble();
    }


    /**
     * Reads a boolean field from the binary stream, or throws an error if the next
     * field in the stream is not of the correct wire type.
     *
     * @return {boolean} The value of the boolean field.
     */
    readBool() {
        goog.asserts.assert(
            this.nextWireType_ === jspb.BinaryConstants.WireType.VARINT);
        return !!this.decoder_.readUnsignedVarint32();
    }


    /**
     * Reads an enum field from the binary stream, or throws an error if the next
     * field in the stream is not of the correct wire type.
     *
     * @return {number} The value of the enum field.
     */
    readEnum() {
        goog.asserts.assert(
            this.nextWireType_ === jspb.BinaryConstants.WireType.VARINT);
        return this.decoder_.readSignedVarint64();
    }


    /**
     * Reads a string field from the binary stream, or throws an error if the next
     * field in the stream is not of the correct wire type.
     *
     * @return {string} The value of the string field.
     */
    readString() {
        goog.asserts.assert(
            this.nextWireType_ === jspb.BinaryConstants.WireType.DELIMITED);
        var length = this.decoder_.readUnsignedVarint32();
        return this.decoder_.readString(length);
    }


    /**
     * Reads a length-prefixed block of bytes from the binary stream, or returns
     * null if the next field in the stream has an invalid length value.
     *
     * @return {!Uint8Array} The block of bytes.
     */
    readBytes() {
        goog.asserts.assert(
            this.nextWireType_ === jspb.BinaryConstants.WireType.DELIMITED);
        var length = this.decoder_.readUnsignedVarint32();
        return this.decoder_.readBytes(length);
    }


    /**
     * Reads a 64-bit varint or fixed64 field from the stream and returns it as an
     * 8-character Unicode string for use as a hash table key, or throws an error
     * if the next field in the stream is not of the correct wire type.
     *
     * @return {string} The hash value.
     */
    readVarintHash64() {
        goog.asserts.assert(
            this.nextWireType_ === jspb.BinaryConstants.WireType.VARINT);
        return this.decoder_.readVarintHash64();
    }


    /**
     * Reads an sint64 field from the stream and returns it as an 8-character
     * Unicode string for use as a hash table key, or throws an error if the next
     * field in the stream is not of the correct wire type.
     *
     * @return {string} The hash value.
     */
    readSintHash64() {
        goog.asserts.assert(
            this.nextWireType_ === jspb.BinaryConstants.WireType.VARINT);
        return this.decoder_.readZigzagVarintHash64();
    }


    /**
     * Reads a 64-bit varint field from the stream and invokes `convert` to produce
     * the return value, or throws an error if the next field in the stream is not
     * of the correct wire type.
     *
     * @param {function(number, number): T} convert Conversion function to produce
     *     the result value, takes parameters (lowBits, highBits).
     * @return {T}
     * @template T
     */
    readSplitVarint64(convert) {
        goog.asserts.assert(
            this.nextWireType_ === jspb.BinaryConstants.WireType.VARINT);
        return this.decoder_.readSplitVarint64(convert);
    }


    /**
     * Reads a 64-bit zig-zag varint field from the stream and invokes `convert` to
     * produce the return value, or throws an error if the next field in the stream
     * is not of the correct wire type.
     *
     * @param {function(number, number): T} convert Conversion function to produce
     *     the result value, takes parameters (lowBits, highBits).
     * @return {T}
     * @template T
     */
    readSplitZigzagVarint64(convert) {
        goog.asserts.assert(
            this.nextWireType_ === jspb.BinaryConstants.WireType.VARINT);
        return this.decoder_.readSplitVarint64(function (lowBits, highBits) {
            return jspb.utils.fromZigzag64(lowBits, highBits, convert);
        });
    }


    /**
     * Reads a 64-bit varint or fixed64 field from the stream and returns it as a
     * 8-character Unicode string for use as a hash table key, or throws an error
     * if the next field in the stream is not of the correct wire type.
     *
     * @return {string} The hash value.
     */
    readFixedHash64() {
        goog.asserts.assert(
            this.nextWireType_ === jspb.BinaryConstants.WireType.FIXED64);
        return this.decoder_.readFixedHash64();
    }


    /**
     * Reads a 64-bit fixed64 field from the stream and invokes `convert`
     * to produce the return value, or throws an error if the next field in the
     * stream is not of the correct wire type.
     *
     * @param {function(number, number): T} convert Conversion function to produce
     *     the result value, takes parameters (lowBits, highBits).
     * @return {T}
     * @template T
     */
    readSplitFixed64(convert) {
        goog.asserts.assert(
            this.nextWireType_ === jspb.BinaryConstants.WireType.FIXED64);
        return this.decoder_.readSplitFixed64(convert);
    }


    /**
     * Reads a packed scalar field using the supplied raw reader function.
     * @param {function(this:jspb.BinaryDecoder)} decodeMethod
     * @return {!Array}
     * @private
     */
    readPackedField_(decodeMethod) {
        goog.asserts.assert(
            this.nextWireType_ === jspb.BinaryConstants.WireType.DELIMITED);
        var length = this.decoder_.readUnsignedVarint32();
        var end = this.decoder_.getCursor() + length;
        var result = [];
        while (this.decoder_.getCursor() < end) {
            // TODO(aappleby): .call is slow
            result.push(decodeMethod.call(this.decoder_));
        }
        return result;
    }


    /**
     * Reads a packed int32 field, which consists of a length header and a list of
     * signed varints.
     * @return {!Array<number>}
     */
    readPackedInt32() {
        return this.readPackedField_(this.decoder_.readSignedVarint32);
    }


    /**
     * Reads a packed int32 field, which consists of a length header and a list of
     * signed varints. Returns a list of strings.
     * @return {!Array<string>}
     */
    readPackedInt32String() {
        return this.readPackedField_(this.decoder_.readSignedVarint32String);
    }


    /**
     * Reads a packed int64 field, which consists of a length header and a list of
     * signed varints.
     * @return {!Array<number>}
     */
    readPackedInt64() {
        return this.readPackedField_(this.decoder_.readSignedVarint64);
    }


    /**
     * Reads a packed int64 field, which consists of a length header and a list of
     * signed varints. Returns a list of strings.
     * @return {!Array<string>}
     */
    readPackedInt64String() {
        return this.readPackedField_(this.decoder_.readSignedVarint64String);
    }


    /**
     * Reads a packed uint32 field, which consists of a length header and a list of
     * unsigned varints.
     * @return {!Array<number>}
     */
    readPackedUint32() {
        return this.readPackedField_(this.decoder_.readUnsignedVarint32);
    }


    /**
     * Reads a packed uint32 field, which consists of a length header and a list of
     * unsigned varints. Returns a list of strings.
     * @return {!Array<string>}
     */
    readPackedUint32String() {
        return this.readPackedField_(this.decoder_.readUnsignedVarint32String);
    }


    /**
     * Reads a packed uint64 field, which consists of a length header and a list of
     * unsigned varints.
     * @return {!Array<number>}
     */
    readPackedUint64() {
        return this.readPackedField_(this.decoder_.readUnsignedVarint64);
    }


    /**
     * Reads a packed uint64 field, which consists of a length header and a list of
     * unsigned varints. Returns a list of strings.
     * @return {!Array<string>}
     */
    readPackedUint64String() {
        return this.readPackedField_(this.decoder_.readUnsignedVarint64String);
    }


    /**
     * Reads a packed sint32 field, which consists of a length header and a list of
     * zigzag varints.
     * @return {!Array<number>}
     */
    readPackedSint32() {
        return this.readPackedField_(this.decoder_.readZigzagVarint32);
    }


    /**
     * Reads a packed sint64 field, which consists of a length header and a list of
     * zigzag varints.
     * @return {!Array<number>}
     */
    readPackedSint64() {
        return this.readPackedField_(this.decoder_.readZigzagVarint64);
    }


    /**
     * Reads a packed sint64 field, which consists of a length header and a list of
     * zigzag varints.  Returns a list of strings.
     * @return {!Array<string>}
     */
    readPackedSint64String() {
        return this.readPackedField_(this.decoder_.readZigzagVarint64String);
    }


    /**
     * Reads a packed fixed32 field, which consists of a length header and a list
     * of unsigned 32-bit ints.
     * @return {!Array<number>}
     */
    readPackedFixed32() {
        return this.readPackedField_(this.decoder_.readUint32);
    }


    /**
     * Reads a packed fixed64 field, which consists of a length header and a list
     * of unsigned 64-bit ints.
     * @return {!Array<number>}
     */
    readPackedFixed64() {
        return this.readPackedField_(this.decoder_.readUint64);
    }


    /**
     * Reads a packed fixed64 field, which consists of a length header and a list
     * of unsigned 64-bit ints.  Returns a list of strings.
     * @return {!Array<number>}
     */
    readPackedFixed64String() {
        return this.readPackedField_(this.decoder_.readUint64String);
    }


    /**
     * Reads a packed sfixed32 field, which consists of a length header and a list
     * of 32-bit ints.
     * @return {!Array<number>}
     */
    readPackedSfixed32() {
        return this.readPackedField_(this.decoder_.readInt32);
    }


    /**
     * Reads a packed sfixed64 field, which consists of a length header and a list
     * of 64-bit ints.
     * @return {!Array<number>}
     */
    readPackedSfixed64() {
        return this.readPackedField_(this.decoder_.readInt64);
    }


    /**
     * Reads a packed sfixed64 field, which consists of a length header and a list
     * of 64-bit ints.  Returns a list of strings.
     * @return {!Array<string>}
     */
    readPackedSfixed64String() {
        return this.readPackedField_(this.decoder_.readInt64String);
    }


    /**
     * Reads a packed float field, which consists of a length header and a list of
     * floats.
     * @return {!Array<number>}
     */
    readPackedFloat() {
        return this.readPackedField_(this.decoder_.readFloat);
    }


    /**
     * Reads a packed double field, which consists of a length header and a list of
     * doubles.
     * @return {!Array<number>}
     */
    readPackedDouble() {
        return this.readPackedField_(this.decoder_.readDouble);
    }


    /**
     * Reads a packed bool field, which consists of a length header and a list of
     * unsigned varints.
     * @return {!Array<boolean>}
     */
    readPackedBool() {
        return this.readPackedField_(this.decoder_.readBool);
    }


    /**
     * Reads a packed enum field, which consists of a length header and a list of
     * unsigned varints.
     * @return {!Array<number>}
     */
    readPackedEnum() {
        return this.readPackedField_(this.decoder_.readEnum);
    }


    /**
     * Reads a packed varint hash64 field, which consists of a length header and a
     * list of varint hash64s.
     * @return {!Array<string>}
     */
    readPackedVarintHash64() {
        return this.readPackedField_(this.decoder_.readVarintHash64);
    }


    /**
     * Reads a packed fixed hash64 field, which consists of a length header and a
     * list of fixed hash64s.
     * @return {!Array<string>}
     */
    readPackedFixedHash64() {
        return this.readPackedField_(this.decoder_.readFixedHash64);
    }
}


/**
 * Pops an instance off the instance cache, or creates one if the cache is
 * empty.
 * @param {jspb.ByteSource=} opt_bytes The bytes we're reading from.
 * @param {number=} opt_start The optional offset to start reading at.
 * @param {number=} opt_length The optional length of the block to read -
 *     we'll throw an assertion if we go off the end of the block.
 * @return {!jspb.BinaryReader}
 */
BinaryReader.alloc = alloc;


/**
 * Global pool of BinaryReader instances.
 * @private {!Array<!jspb.BinaryReader>}
 */
// BinaryReader.instanceCache_ = instanceCache_;

export default {BinaryReader};
export {BinaryReader};

