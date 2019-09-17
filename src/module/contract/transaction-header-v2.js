
import {proto} from '@net-grpc/lib/proto';

import BigInteger from 'bn';
// import hexbytes from '@module/util/hexbytes';
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
 */
class TransactionHeader extends proto.nsbrpc.TransactionHeader {
    constructor({src, dst, data, value, nonce, signature, opt_data}) {
        super(opt_data);

        /**
         * @description sender
         * @type {Uint8Array}
         */
        this.src = src;

        /**
         * @description receiver
         * @type {Uint8Array}
         */
        this.dst = dst;

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

    /**
     * @Description:
     * @author Myriad-Dreamin
     * @returns {!Uint8Array}
     */
    get src() {
        return this.getSrc_asU8();
    }

    /**
     * @Description:
     * @author Myriad-Dreamin
     * @param value {!(string|Uint8Array)}
     */
    set src(value) {
        return this.setSrc(value);
    }

    src_asString() {
        return this.getSrc();
    }

    get dst() {
        return this.getDst_asU8();
    }

    set dst(value) {
        return this.setDst(value);
    }

    dst_asString() {
        return this.getDst();
    }

    get data() {
        return this.getData_asU8();
    }

    set data(value) {
        return this.setData(value);
    }

    data_asString() {
        return this.getData();
    }

    get value() {
        return this._value;
    }

    set value(value) {
        if (!value) {
            this._value = undefined;
            this.setNonce(undefined);
        } if (typeof value === 'number') {
            this._value = new BigInteger(value);
        } else if (value instanceof BigInteger) {
            this._value = value;
        } else if (typeof value === 'string') {
            this._value = BigInteger.fromString(value, 16);
        } else if (value instanceof Uint8Array || value instanceof ArrayBuffer) {
            this._value = BigInteger.fromBuffer(value);
        } else {
            throw TypeError('cant convert value to property.value');
        }
        this.setValue(this._value.toByteArray());
    }

    value_asString() {
        return encodeBigInt(this._value);
    }

    get nonce() {
        return this._nonce;
    }

    set nonce(value) {
        if (!value) {
            this._nonce = undefined;
            this.setNonce(undefined);
        } else if (typeof value === 'number') {
            this._nonce = new BigInteger(value);
        } else if (value instanceof BigInteger) {
            this._nonce = value;
        } else if (typeof value === 'string') {
            this._nonce = BigInteger.fromString(value, 16);
        } else if (value instanceof Uint8Array || value instanceof ArrayBuffer) {
            this._nonce = BigInteger.fromBuffer(value);
        } else {
            throw TypeError('cant convert value to property.nonce');
        }
        this.setNonce(this._nonce.toByteArray());
    }

    nonce_asString() {
        return encodeBigInt(this._nonce);
    }

    get signature() {
        return this.getSignature_asU8();
    }

    set signature(value) {
        return this.setSignature(value);
    }

    signature_asString() {
        return this.getSignature();
    }

    toJSON() {
        return JSON.stringify(this.toJSONObj());
    }

    toJSONObj() {
        return {
            src: this.src_asString(),
            dst: this.dst_asString(),
            data: this.data_asString(),
            value: this.value_asString(),
            nonce: this.nonce_asString(),
            signature: this.signature_asString(),
        };
    }

    serializeSignaturable() {
        return this.serializeBinary();
    }
    serialize() {
        return this.serializeBinary();
    }

    // hex() {
    //     return this.
    // }
}

export default {TransactionHeader};
export {TransactionHeader};