
// class Axios extends

import {BinaryEncoder} from '@third-party/binary-encoder/binary-encoder';
import hexbytes from '@module/util/hexbytes';

class Contract {
    /**
     * @Description:
     * @author Myriad-Dreamin
     * @param client {NSBClient}
     */
    constructor(client) {
        this.client = client;
    }

    /**
     * @Description:
     * @author Myriad-Dreamin
     * @param father {NSBClient}
     */
    bindFather(father) {
        this.client = father;
    }

    /**
     * @Description:
     * @author Myriad-Dreamin
     * @param trans_type {!number}
     * @param contract_name {!string}
     * @param body {!Uint8Array}
     */
    sendContractTx(trans_type, contract_name, body) {
        let writer = new BinaryEncoder();
        writer.writeUint8(trans_type);
        writer.writeString(contract_name);
        writer.writeBytes(body);
        return this.client.broadcastTxCommit('0x' + hexbytes.BytesToHex(writer.end()));
    }
}

export default {Contract};
export {Contract};
