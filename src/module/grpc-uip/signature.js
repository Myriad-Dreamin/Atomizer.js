import hexbytes from '@module/util/hexbytes';
import {proto} from '@net-grpc/lib/proto';

class Signature extends proto.uiprpc.base.Signature {
    constructor(signature_type, content, opt_data) {
        super(opt_data);
        this.setSignatureType(signature_type);
        this.setContent(content);
    }

    setSignatureType(signature_type) {
        return super.setSignatureType(signature_type);
    }

    setContent(content) {
        if (typeof content === 'string') {
            content = hexbytes.HexToBytes(content);
            if (content === null) {
                return Error('convert error');
            }
        }

        return super.setContent(content);
    }

    showContent() {
        return hexbytes.BytesToHex(super.getContent());
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


