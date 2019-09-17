
import axios from 'axios';

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
}

export default {
    NSBClient,
};

export {NSBClient};
