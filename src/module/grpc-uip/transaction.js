// message Transaction {
//     uint64 chain_id = 1;
//     bytes src = 2;
//     bytes dst = 3;
//     bytes domain = 4;
//     bytes meta = 5;
// }


import hexbytes from '@module/util/hexbytes';
import {proto} from '@net-grpc/lib/proto';

class Transaction extends proto.uiprpc.base.Transaction {
    constructor(chain_id, src, dst, domain, meta, opt_data) {
        super(opt_data);
        this.setChainId(chain_id);
        this.setSrc(src);
        this.setDst(dst);
        this.setDomain(domain);
        this.setMeta(meta);
    }

    setSrc(src) {
        if (typeof src === 'string') {
            src = hexbytes.HexToBytes(src);
            if (src === null) {
                return Error('convert error');
            }
        }

        return this.transaction.setSrc(src);
    }

    setDst(dst) {
        if (typeof dst === 'string') {
            dst = hexbytes.HexToBytes(dst);
            if (dst === null) {
                return Error('convert error');
            }
        }

        return this.transaction.setDst(dst);
    }

    setDomain(domain) {
        if (typeof domain === 'string') {
            domain = hexbytes.HexToBytes(domain);
            if (domain === null) {
                return Error('convert error');
            }
        }

        return this.transaction.setDomain(domain);
    }

    setMeta(meta) {
        if (typeof meta === 'string') {
            meta = hexbytes.HexToBytes(meta);
            if (meta === null) {
                return Error('convert error');
            }
        }

        return this.transaction.setMeta(meta);
    }

    showSrc() {
        return hexbytes.BytesToHex(this.transaction.getSrc());
    }

    showDst() {
        return hexbytes.BytesToHex(this.transaction.getDst());
    }

    shotDomain() {
        return hexbytes.BytesToHex(this.transaction.getDomain());
    }

    showMeta() {
        return hexbytes.BytesToHex(this.transaction.getMeta());
    }
}

export default {
    Transaction,
};

export {Transaction};


