import hexbytes from '@module/util/hexbytes';
import {proto} from '@net-grpc/lib/proto';

class Account extends proto.uiprpc.base.Account {
    constructor(chain_id, address, opt_data) {
        if (opt_data) super(opt_data); else super();
        this.setChainId(chain_id);
        this.setAddress(address);
    }

    setAddress(address) {
        if (typeof address === 'string') {
            address = hexbytes.HexToBytes(address);
            if (address === null) {
                return Error('convert error');
            }
        }
        return super.setAddress(address);
    }

    showAddress() {
        return hexbytes.BytesToHex(super.getAddress());
    }
}

export default {
    Account,
};

export {Account};
