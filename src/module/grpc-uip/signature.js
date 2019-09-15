/*

message Signature {
    uint32 signature_type = 1;
    bytes content = 2;
}

message ShortenMerkleProof {
    uint64 merkleproof_type = 1;
    bytes roothash = 2;
    bytes key = 3;
    bytes value = 4;
}

*/


import hexbytes from '@module/util/hexbytes';
import {proto} from '@net-grpc/lib/proto';

class Signature {
    constructor(signature_type, content) {
        this.signature = new proto.uiprpc.base.Signature();
        this.setSignatureType(signature_type);
        this.setContent(content);
    }   

    setSignatureType(signature_type) {
        return this.signature.setSignatureType(signature_type);
    }

    setContent(content) {
        if (typeof content === 'string') {
            content = hexbytes.HexToBytes(content);
            if (content === null) {
                return false;
            }
        } 

        return this.signature.setContent(content);
    }

    getSignatureType() {
        return this.signature.getSignatureType();
    }

    getContent() {
        return this.signature.getContent();
    }

    showContent() {
        return hexbytes.BytesToHex(this.signature.getContent());
    }
}
// !Array<!proto.uiprpc.base.Signature>
class SignatureList extends Array {
    constructor() {
        super();
        for (const signature of arguments) {
            if (signature instanceof Signature) {
                this.push(signature);
            }
        }
    }

    addSignature(signature_type, content) {
        this.push(new Signature(signature_type, content));
    }



}


export default {
    Signature,
    SignatureList,
};

export {Signature, SignatureList};


