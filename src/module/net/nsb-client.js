import axios from 'axios';
import {BinaryEncoder} from '@third-party/binary-encoder/binary-encoder';
import hexbytes from '@module/util/hexbytes';

// class Axios extends

class ISCContract {

    /**
     * @Description:
     * @author Myriad-Dreamin
     * @param client {ISCClient}
     * @param address {string}
     * @param host {string}
     * @param freeze {boolean}
     */
    constructor(client, address, {host, freeze}) {
        this.client = client;
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


class ISCClient {
    /**
     * @Description:
     * @author Myriad-Dreamin
     * @param client {NSBClient}
     */
    constructor(client) {
        this.client = client;
    }

    createISC() {

    }

    /**
     * @Description:
     * @author Myriad-Dreamin
     * @param address {string}
     * @returns {ISCContract}
     */
    bindContract(address) {
        return new ISCContract(this, address);
    }

    /**
     * @Description:
     * @author Myriad-Dreamin
     * @param host {string}
     * @returns {ISCClient}
     */
    freeze(host) {
        return new ISCClient(this.client.freeze(host));
    }

    /**
     * @Description:
     * @author Myriad-Dreamin
     * @param father {NSBClient}
     */
    bindFather(father) {
        this.client = father;
    }

    addActions() {

    }

    addAction() {

    }

    getAction() {

    }

    addMerkleProof() {

    }

    addBlockCheck() {

    }

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

    getMerkleProof() {

    }


}



/**
 * @typedef jsonrpcResponse
 * @param response.jsonrpc {string}
 * @param response.error {Object}
 * @param response.result {Object}
 */


class NSBClient {
    /**
     * @Description:
     * @author Myriad-Dreamin
     * @param host {string}
     * @param isc {ISCClient}
     // * @param axios {axios}
     */
    constructor(host) {
        this.request = axios.create({
            baseURL: host,
            timeout: 10000,
            validateStatus: function (status) {
                return status === 200; // Accept only if the status code is equal to 200
            }
        });

        this.host = host;
        this.request.response.use(this.JSONRPCMiddleWare);
    }

    /**
     * @Description:
     * @author Myriad-Dreamin
     * @param host {string}
     */
    setHost(host) {
        this.request.baseURL = host;
    }

    freeze(host) {
        return new NSBClient(host || this.host);
    }

    /**
     * @Description:
     * @author Myriad-Dreamin
     * @param response {AxiosResponse<jsonrpcResponse>}
     */
    JSONRPCMiddleWare(response) {
        if (response.data.jsonrpc !== '2.0') {
            throw Error('reject ret that is not jsonrpc: 2.0');
        }

        if (response.data.error) {
            throw Error(response.data.error);
        }

        return response.data.result;
    }

    /**
     * @Description:
     * @author Myriad-Dreamin
     * @returns {Promise<AxiosResponse<T>>}
     */
    getAbciInfo() {
        return this.request.get('/abci_info');
    }

    /**
     * @Description:
     * @author Myriad-Dreamin
     * @param rangeL {number|string}
     * @param rangeR {number|string}
     * @returns {Promise<AxiosResponse<T>>}
     */
    getBlocks(rangeL, rangeR) {
        return this.request.get('/blockchain', {
            params: {
                'minHeight': rangeL,
                'maxHeight': rangeR,
            }
        });
    }

    /**
     * @Description:
     * @author Myriad-Dreamin
     * @param block_id {number|string}
     * @returns {Promise<AxiosResponse<T>>}
     */
    getBlockResults(block_id) {
        return this.request.get('/block_results', {
            params: {
                'height': block_id,
            }
        });
    }

    /**
     * @Description:
     * @author Myriad-Dreamin
     * @param block_id {number|string}
     * @returns {Promise<AxiosResponse<T>>}
     */
    getCommitInfo(block_id) {
        return this.request.get('/commit', {
            params: {
                'height': block_id,
            }
        });
    }

    /**
     * @Description:
     * @author Myriad-Dreamin
     * @param block_id {number|string}
     * @returns {Promise<AxiosResponse<T>>}
     */
    getConsensusParamsInfo(block_id) {
        return this.request.get('/consensus_params', {
            params: {
                'height': block_id,
            }
        });
    }

    /**
     * @Description:
     * @author Myriad-Dreamin
     * @param transaction_body {string}
     * @returns {Promise<AxiosResponse<T>>}
     */
    broadcastTxCommit(transaction_body) {
        return this.request.get('/broadcast_tx_commit', {
            params: {
                'tx': transaction_body,
            }
        });
    }

    // broadcastTxAsync

    /**
     * @Description:
     * @author Myriad-Dreamin
     * @returns {Promise<AxiosResponse<T>>}
     */
    getConsensusState() {
        return this.request.get('/consensus_state');
    }

    /**
     * @Description:
     * @author Myriad-Dreamin
     * @returns {Promise<AxiosResponse<T>>}
     */
    getGenesis() {
        return this.request.get('/genesis');
    }

    /**
     * @Description:
     * @author Myriad-Dreamin
     * @returns {Promise<AxiosResponse<T>>}
     */
    getHealth() {
        return this.request.get('/health');
    }

    /**
     * @Description:
     * @author Myriad-Dreamin
     * @returns {Promise<AxiosResponse<T>>}
     */
    getNetInfo() {
        return this.request.get('/net_info');
    }

    /**
     * @Description:
     * @author Myriad-Dreamin
     * @param data {string}
     * @param path {string}
     * @returns {Promise<AxiosResponse<T>>}
     */
    getProof(data, path) {
        return this.request.get('/abci_query', {
            params: {data, path}
        });
    }

    /**
     * @Description:
     * @author Myriad-Dreamin
     * @returns {Promise<AxiosResponse<T>>}
     */
    getNumUnconfirmedTxs() {
        return this.request.get('/num_unconfirmed_txs');
    }

    /**
     * @Description:
     * @author Myriad-Dreamin
     * @returns {Promise<AxiosResponse<T>>}
     */
    getStatus() {
        return this.request.get('/status');
    }

    /**
     * @Description:
     * @author Myriad-Dreamin
     * @param limit {number|string}
     * @returns {Promise<AxiosResponse<T>>}
     */
    getUnconfirmedTxs(limit) {
        return this.request.get('/unconfirmed_txs', {
            params: {limit},
        });
    }

    /**
     * @Description:
     * @author Myriad-Dreamin
     * @param block_id {number|string}
     * @returns {Promise<AxiosResponse<T>>}
     */
    getValblock_idators(block_id) {
        return this.request.get('/validators', {
            params: {
                'height': block_id
            },
        });
    }

    /**
     * @Description:
     * @author Myriad-Dreamin
     * @param hash {string}
     * @returns {Promise<AxiosResponse<T>>}
     */
    getTransaction(hash) {
        return this.request.get('/tx', {
            params: {hash},
        });
    }

    /**
     * @Description:
     * @author Myriad-Dreamin
     * @param trans_type {!number}
     * @param contract_name {!string}
     * @param body {!Uint8Array}
     */
    sendContractTx(trans_type, contract_name, body) {
        var writer = new BinaryEncoder();
        writer.writeUint8(trans_type);
        writer.writeString(contract_name);
        writer.writeBytes(body);
        return this.broadcastTxCommit('0x' + hexbytes.BytesToHex(writer.end()));
    }
}

const nsb = new NSBClient('127.0.0.1:26657');
nsb.isc = new ISCClient(this);


export default {
    nsb,
    NSBClient,
    ISCClient,
    ISCContract,
};

export {nsb, NSBClient, ISCClient, ISCContract};


