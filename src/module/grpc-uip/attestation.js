
import hexbytes from '@module/util/hexbytes';
import {proto} from '@net-grpc/lib/proto';

class Attestation extends proto.uiprpc.base.Attestation {
    constructor(tid, aid, content, signatures, opt_data) {
        if(opt_data) super(opt_data); else super();
        this.setTid(tid);
        this.setAid(aid);
        this.setContent(content);
        this.setSignatures(signatures);
    }   

    setTid(tid) {
        return super.setTid(tid);
    }

    setAid(aid) {
        return super.setAid(aid);
    }

    setContent(content) {
        if (typeof content === 'string') {
            content = hexbytes.HexToBytes(content);
            if (content === null) {
                return false;
            }
        } 

        return super.setContent(content);
    }

    setSignatures(signatures) {

        if (!(signatures instanceof Array)) {
            return 'signatures not valid';
        }

        if (signatures.length === 0) {
            super.setSignaturesList(signatures);
        }

        if(signatures[0] instanceof proto.uiprpc.base.Signature) {
            super.setSignaturesList(signatures);
        } else {
            return 'signatures not valid';
        }
    }

    getTid() {
        return super.getTid();
    }

    
    getAid() {
        return super.getAid();
    }


    getContent() {
        return super.getContent();
    }

    showContent() {
        return hexbytes.BytesToHex(super.getContent());
    }
    
    showStringContent() {
        return hexbytes.BytesToString(super.getContent());
    }

    getSignatures() {
        return super.getSignatures();
    }
}


export default {
    Attestation,
};

export {Attestation};
