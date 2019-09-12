
import hexbytes from '@module/util/hexbytes';
import BaseRpc from '@net-grpc/lib/base_pb';

class Account {
    constructor(chain_id, address) {
        this.account = new BaseRpc.Account();
        this.setChainId(chain_id);
        this.setAddress(address);
    }   

    setChainId(chain_id) {
        return this.account.setChainId(chain_id);
    }

    setAddress(address) {
        if (typeof address === 'string') {
            address = hexbytes.HexToBytes(address);
            if (address === null) {
                return false;
            }
        } 

        return this.account.setAddress(address);
    }

    getChainId() {
        return this.account.getChainId();
    }

    getAddress() {
        return this.account.getAddress();
    }

    showAddress() {
        return hexbytes.BytesToHex(this.account.getAddress());
    }
}

export default {
    Account,
};

export {Account};
