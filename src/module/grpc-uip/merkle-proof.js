import hexbytes from '@module/util/hexbytes';
import {proto} from '@net-grpc/lib/proto';

class MerkleProof extends proto.uiprpc.base.MerkleProof {
    constructor(merkleproof_type, proof, key, value, opt_data) {
        super(opt_data);
        this.setMerkleproofType(merkleproof_type);
        this.setProof(proof);
        this.setKey(key);
        this.setValue(value);
    }

    setProof(proof) {
        if (typeof proof === 'string') {
            proof = hexbytes.HexToBytes(proof);
            if (proof === null) {
                return Error('convert error');
            }
        }

        return super.setProof(proof);
    }

    setKey(key) {
        if (typeof key === 'string') {
            key = hexbytes.HexToBytes(key);
            if (key === null) {
                return Error('convert error');
            }
        }

        return super.setKey(key);
    }

    setValue(value) {
        if (typeof value === 'string') {
            value = hexbytes.HexToBytes(value);
            if (value === null) {
                return Error('convert error');
            }
        }

        return super.setValue(value);
    }

    showProof() {
        return hexbytes.BytesToHex(super.getProof());
    }

    showKey() {
        return hexbytes.BytesToHex(super.getKey());
    }

    showValue() {
        return hexbytes.BytesToHex(super.getValue());
    }
}

export default {
    MerkleProof,
};


export {MerkleProof};

