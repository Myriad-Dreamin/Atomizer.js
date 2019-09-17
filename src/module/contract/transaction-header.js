import {BinaryEncoder} from '@third-party/binary-encoder/binary-encoder';

require('google-closure-library');

const goog = global.goog;
goog.require('goog.crypt.base64');

import BigInteger from 'bn';
import hexbytes from '@module/util/hexbytes';
// import _ from 'lodash';
/*
type TransactionHeader struct {
	From            []byte        `json:"from"`
	ContractAddress []byte        `json:"to"`
	Data            []byte        `json:"data"`
	Value           *math.Uint256 `json:"value"`
	Nonce           *math.Uint256 `json:"nonce"`
	Signature       []byte        `json:"signature"`
}
*/

const encodeBytes = goog.crypt.base64.encodeByteArray;

/**
 *
 * @param b {BigInteger}
 * @returns {string}
 */
function encodeBigInt(b) {
    return b?b.toString(10):null;
}

/**
 * @Description:
 * @author Myriad-Dreamin
 * @deprecated this version of transaction header is for json,
 * and the new branch of NSB is considering using protobuf to serialize transaction header
 */
class TransactionHeader {
    constructor({from, to, data, value, nonce, signature}) {

        /**
         * @description sender
         * @type {Uint8Array}
         */
        this.from = from;

        /**
         * @description receiver
         * @type {Uint8Array}
         */
        this.to = to;

        /**
         * @description contract data or other information
         * @type {Uint8Array}
         */
        this.data = data;

        /**
         * @description max acceptable value that can be paid
         * @type {BigInteger}
         */
        this.value = value;

        /**
         * @description random number which avoid double spending attack
         * @type {BigInteger}
         */
        this.nonce = nonce;


        /**
         * @description contract data or other information
         * @type {Uint8Array}
         */
        this.signature = signature;
    }

    get from() {
        return this._from;
    }

    set from(value) {
        if (value instanceof Uint8Array) {
            this._from = value;
        } else if (typeof value === 'string') {
            this._from = hexbytes.HexToBytes(value);
        } else {
            this._from = undefined;
            throw Error('could not convert value to seg"from"');
        }
    }

    from_asString() {
        return encodeBytes(this._from);
    }

    get to() {
        return this._to;
    }

    set to(value) {
        if (value instanceof Uint8Array) {
            this._to = value;
        } else if (typeof value === 'string') {
            this._to = hexbytes.HexToBytes(value);
        } else {
            this._to = undefined;
            throw Error('could not convert value to seg"from"');
        }
    }

    to_asString() {
        return encodeBytes(this._to);
    }

    get data() {
        return this._data;
    }

    set data(value) {
        if (value instanceof Uint8Array) {
            this._data = value;
        } else if (typeof value === 'string') {
            this._data = hexbytes.StringToBytes(value);
        } else { // not support object, because it is expensive
            this._data = undefined;
            throw Error('could not convert value to seg"from"');
        }
    }

    data_asString() {
        return encodeBytes(this._data);
    }

    get value() {
        return this._value;
    }

    set value(value) {
        if (typeof value === 'number') {
            this._value = new BigInteger(value);
        }
        this._value = value;
    }

    value_asString() {
        return encodeBigInt(this._value);
    }

    get nonce() {
        return this._nonce;
    }

    set nonce(value) {
        this._nonce = value;
    }

    nonce_asString() {
        return encodeBigInt(this._nonce);
    }

    get signature() {
        return this._signature;
    }

    set signature(value) {
        this._signature = value;
    }

    signature_asString() {
        return encodeBytes(this._signature);
    }

    toJSON() {
        return JSON.stringify(this.toJSONObj());
    }

    toJSONObj() {
        return {
            from: this.from_asString(),
            to: this.to_asString(),
            data: this.data_asString(),
            value: this.value_asString(),
            nonce: this.nonce_asString(),
            signature: this.signature_asString(),
        };
    }

    serializeSignaturable() {
        let writer = new BinaryEncoder();
        writer.writeBytes(this._from);
        writer.writeBytes(this._to);
        writer.writeBytes(this._data);
        writer.writeBytes(this._value.toByteArray());
        writer.writeBytes(this._nonce.toByteArray());
        return writer.end();
    }
}

export default {TransactionHeader};
export {TransactionHeader};