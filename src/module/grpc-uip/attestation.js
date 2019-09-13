
import hexbytes from '@module/util/hexbytes';
import { SignaturesList } from './signature';
import BaseRpc from '@net-grpc/lib/base_pb';

class Attestation {
    constructor(tid, aid, content, signatures) {
        this.attestation = new BaseRpc.Attestation();
        this.setTid(tid);
        this.setAid(aid);
        this.setContent(content);
        this.setSignatures(signatures);
    }   

    setTid(tid) {
        return this.Attestation.setTid(tid);
    }

    setAid(aid) {
        return this.Attestation.setAid(aid);
    }

    setContent(content) {
        if (typeof content === 'string') {
            content = hexbytes.HexToBytes(content);
            if (content === null) {
                return false;
            }
        } 

        return this.Attestation.setContent(content);
    }

    setSignatures(signatures) {

        if (!(signatures instanceof Array)) {
            return 'signatures not valid';
        }

        if (signatures.length == 0) {
            this.Attestation.setSignaturesList(signatures);
        }

        if (signatures[0] instanceof SignaturesList) {
            this.Attestation.setSignaturesList(signatures.signatures);
        } else if(signatures[0] instanceof BaseRpc.Signature) {
            this.Attestation.setSignaturesList(signatures);
        } else {
            return 'signatures not valid';
        }
    }

    getTid() {
        return this.Attestation.getTid();
    }

    
    getAid() {
        return this.Attestation.getAid();
    }


    getContent() {
        return this.Attestation.getContent();
    }

    showContent() {
        return hexbytes.BytesToHex(this.Attestation.getContent());
    }
    
    showStringContent() {
        return hexbytes.BytesToString(this.Attestation.getContent());
    }

    getSignatures() {
        return this.Attestation.getSignatures();
    }
}


export default {
    Attestation,
};

export {Attestation};
