
import hexbytes from '@module/util/hexbytes';
import BaseRpc from '@net-grpc/lib/base_pb';

class MerkleProof {
    constructor(merkleproof_type, proof, key, value) {
        this.account = new BaseRpc.Account();
        this.setMerkleproofType(merkleproof_type);
        this.setProof(proof);
        this.setKey(key);
        this.setValue(value);
    }   

    setMerkleproofType(merkleproof_type) {
        return this.account.setMerkleproofType(merkleproof_type);
    }

    setProof(proof) {
        if (typeof proof === 'string') {
            proof = hexbytes.HexToBytes(proof);
            if (proof === null) {
                return false;
            }
        } 

        return this.account.setAddress(proof);
    }

    setKey(key) {
        if (typeof key === 'string') {
            key = hexbytes.HexToBytes(key);
            if (key === null) {
                return false;
            }
        } 

        return this.account.setAddress(key);
    }

    setValue(value) {
        if (typeof value === 'string') {
            value = hexbytes.HexToBytes(value);
            if (value === null) {
                return false;
            }
        } 

        return this.account.setAddress(value);
    }

    getMerkleproofType() {
        return this.account.getMerkleproofType();
    }

    getProof() {
        return this.account.getProof();
    }

    showProof() {
        return hexbytes.BytesToHex(this.account.getProof());
    }

    getKey() {
        return this.account.getKey();
    }

    showKey() {
        return hexbytes.BytesToHex(this.account.getKey());
    }

    getValue() {
        return this.account.getValue();
    }

    showValue() {
        return hexbytes.BytesToHex(this.account.getValue());
    }
}

export default {
    MerkleProof,
};


export {MerkleProof};

