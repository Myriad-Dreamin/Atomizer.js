
import hexbytes from '@module/util/hexbytes';
import {proto} from '@net-grpc/lib/proto';

class MerkleProof {
    constructor(merkleproof_type, proof, key, value) {
        this.merkleproof = new proto.uiprpc.base.MerkleProof();
        this.setMerkleproofType(merkleproof_type);
        this.setProof(proof);
        this.setKey(key);
        this.setValue(value);
    }   

    setMerkleproofType(merkleproof_type) {
        return this.merkleproof.setMerkleproofType(merkleproof_type);
    }

    setProof(proof) {
        if (typeof proof === 'string') {
            proof = hexbytes.HexToBytes(proof);
            if (proof === null) {
                return false;
            }
        } 

        return this.merkleproof.setProof(proof);
    }

    setKey(key) {
        if (typeof key === 'string') {
            key = hexbytes.HexToBytes(key);
            if (key === null) {
                return false;
            }
        } 

        return this.merkleproof.setKey(key);
    }

    setValue(value) {
        if (typeof value === 'string') {
            value = hexbytes.HexToBytes(value);
            if (value === null) {
                return false;
            }
        } 

        return this.merkleproof.setValue(value);
    }

    getMerkleproofType() {
        return this.merkleproof.getMerkleproofType();
    }

    getProof() {
        return this.merkleproof.getProof();
    }

    showProof() {
        return hexbytes.BytesToHex(this.merkleproof.getProof());
    }

    getKey() {
        return this.merkleproof.getKey();
    }

    showKey() {
        return hexbytes.BytesToHex(this.merkleproof.getKey());
    }

    getValue() {
        return this.merkleproof.getValue();
    }

    showValue() {
        return hexbytes.BytesToHex(this.merkleproof.getValue());
    }
}

export default {
    MerkleProof,
};


export {MerkleProof};

