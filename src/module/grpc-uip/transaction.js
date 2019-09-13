


// message Transaction {
//     uint64 chain_id = 1;
//     bytes src = 2;
//     bytes dst = 3;
//     bytes domain = 4;
//     bytes meta = 5;
// }


import hexbytes from '@module/util/hexbytes';
import BaseRpc from '@net-grpc/lib/base_pb';

class Transaction {
    constructor(chain_id, src, dst, domain, meta) {
        this.transaction = new BaseRpc.Transaction();
        this.setChainId(chain_id);
        this.setSrc(src);
        this.setDst(dst);
        this.setDomain(domain);
        this.setMeta(meta);
    }   

    setChainId(chain_id) {
        return this.transaction.setChainId(chain_id);
    }

    setSrc(src) {
        if (typeof src === 'string') {
            src = hexbytes.HexToBytes(src);
            if (src === null) {
                return false;
            }
        } 

        return this.transaction.setSrc(src);
    }

    setDst(dst) {
        if (typeof dst === 'string') {
            dst = hexbytes.HexToBytes(dst);
            if (dst === null) {
                return false;
            }
        } 

        return this.transaction.setDst(dst);
    }

    setDomain(domain) {
        if (typeof domain === 'string') {
            domain = hexbytes.HexToBytes(domain);
            if (domain === null) {
                return false;
            }
        } 

        return this.transaction.setDomain(domain);
    }

    setMeta(meta) {
        if (typeof meta === 'string') {
            meta = hexbytes.HexToBytes(meta);
            if (meta === null) {
                return false;
            }
        } 

        return this.transaction.setMeta(meta);
    }

    getChainId() {
        return this.transaction.getChainId();
    }

    getSrc() {
        return this.transaction.getSrc();
    }

    showSrc() {
        return hexbytes.BytesToHex(this.transaction.getSrc());
    }

    getDst() {
        return this.transaction.getDst();
    }

    showDst() {
        return hexbytes.BytesToHex(this.transaction.getDst());
    }
    getDomain() {
        return this.transaction.getDomain();
    }

    shotDomain() {
        return hexbytes.BytesToHex(this.transaction.getDomain());
    }
    getMeta() {
        return this.transaction.getMeta();
    }

    showMeta() {
        return hexbytes.BytesToHex(this.transaction.getMeta());
    }
}

export default {
    Transaction,
};

export {Transaction};


