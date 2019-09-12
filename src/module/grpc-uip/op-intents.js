
// import hexbytes from '@module/util/hexbytes';
import { BytesList } from '@module/util/bytes-list';
import BaseRpc from '@net-grpc/lib/base_pb';

class OpIntents {
    
    constructor(contents, dependencies) {
        this.opintents = new BaseRpc.OpIntents();
        this.setChainId(contents);
        this.setAddress(dependencies);
    }
    
    setSignatures(signatures) {

        if (!(signatures instanceof Array)) {
            if (signatures[0] instanceof BytesList) {
                this.Attestation.setSignaturesList(signatures.container);
            }
            return 'signatures not valid';
        }

        if (signatures.length == 0) {
            this.Attestation.setSignaturesList(signatures);
        }

        if(signatures[0] instanceof Uint8Array) {
            this.Attestation.setSignaturesList(signatures);
        } else {
            return 'signatures not valid';
        }
    }

    getSignatures() {
        return this.Attestation.getSignatures();
    }
}

export default {
    OpIntents,
};

export {OpIntents};
