
import {Contract} from '@module/contract/contract';
// import {TransactionHeader} from '@module/contract/transaction-header';

/**
 *
 * @param signer
 * @param funds {number[]}
 * @param iscOwners {Uint8Array[]}
 * @param bytesTransactionIntents {Uint8Array[]}
 * @param vesSignature {Uint8Array}
 */
// eslint-disable-next-line no-unused-vars
function buildCreateISCTransaction(signer, funds, iscOwners, bytesTransactionIntents, vesSignature) {
    throw Error('todo');
}



class ISCClient extends Contract {
    constructor(client) {
        super(client);
    }

    /**
     * @Description:
     * @author Myriad-Dreamin
     * @param address {string}
     * @returns {ISCContract}
     */
    bindContract(address) {
        return new ISCContract(this.client, address);
    }

    /**
     * @deprecated
     */
    // createISC() {
    //     throw Error('only used in golang');
    // }

    /**
     *
     */
    updateTxInfo() {

    }

    freezeInfo() {

    }

    insuranceClaim() {

    }

    settleContract() {

    }

    userAck() {

    }
}


class ISCContract extends ISCClient {

    /**
     * @Description:
     * @author Myriad-Dreamin
     * @param client {ISCClient}
     * @param address {string}
     * @param host {string}
     * @param freeze {boolean}
     */
    constructor(client, address, {host, freeze}) {
        super(client);
        this.address = address;
        if(host) {
            this.freeze(host);
        } else if(freeze) {
            this.freeze();
        }
    }

    /**
     * @Description:
     * @author Myriad-Dreamin
     * @param host
     */
    freeze(host) {
        this.client = this.client.freeze(host);
    }
}

export default {ISCClient, ISCContract};
export {ISCClient, ISCContract};
