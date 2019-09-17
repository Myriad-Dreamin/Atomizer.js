import {Contract} from '@module/contract/contract';
import hexbytes from '@module/util/hexbytes';
import {TransactionHeader} from '@module/contract/transaction_header';
import {BigInteger} from 'bn';
import crypto from 'crypto';
import {TransactionType} from '@module/contract/transaction-type';

require('google-closure-library');

const goog = global.goog;
goog.require('goog.crypt.base64');

const encodeBytes = goog.crypt.base64.encodeByteArray;

/**
 * @description
 * @author Myriad-Dreamin
 * @param iscAddress {Uint8Array}
 * @param tid {number}
 * @param aid {number}
 * @param stype {number}
 * @param content {Uint8Array}
 * @param signature {Uint8Array}
 * @returns {string}
 */
function encodeArgsAction(iscAddress, tid, aid, stype, content, signature) {
    return JSON.stringify({
        1: encodeBytes(iscAddress),
        2: tid,
        3: aid,
        4: stype,
        5: encodeBytes(content),
        6: signature(signature),
    });
}

/**
 * @typedef bytesLike {string|Uint8Array|ArrayBuffer}
 */

/**
 *
 * @param obj
 * @returns {Uint8Array|*|Uint8Array}
 */

function fromBytesLike(obj) {
    if (obj instanceof Uint8Array) {
        return obj;
    } else if (typeof obj === 'string') {
        return hexbytes.StringToBytes(obj);
    } else if (obj instanceof ArrayBuffer) {
        return new Uint8Array(obj);
    }
}


class SystemAction extends Contract {
    constructor(client) {
        super(client);
    }

    /**
     * @description
     * @author Myriad-Dreamin
     * @param signer
     * @param iscAddress {bytesLike}
     * @param tid {number}
     * @param aid {number}
     * @param stype {number}
     * @param content {bytesLike}
     * @param signature {bytesLike}
     */
    addAction(signer, iscAddress, tid, aid, stype, content, signature) {
        let args_action_packet = encodeArgsAction(
            fromBytesLike(iscAddress),
            tid, aid, stype,
            fromBytesLike(content),
            fromBytesLike(signature),
        );
        let transaction = new TransactionHeader();
        transaction.from = signer.public().bytes();
        transaction.to = null;
        transaction.value = 0;
        transaction.nonce = BigInteger.fromBuffer(crypto.randomBytes(32));
        transaction.data = args_action_packet;
        transaction.signature = signer.sign(transaction.serializeSignaturable());
        return this.sendContractTx(TransactionType.SystemCall, 'system.action@addAction', transaction);
    }

    addActions() {

    }

    getAction() {

    }
}

export default {SystemAction};
export {SystemAction};

