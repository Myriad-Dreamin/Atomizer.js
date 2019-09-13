
// import hexbytes from '@module/util/hexbytes';
import { BytesList } from '@module/util/bytes-list';
import BaseRpc from '@net-grpc/lib/base_pb';

class OpIntents {
    
    constructor(contents, dependencies) {
        this.opintents = new BaseRpc.OpIntents();
        this.setContent(contents);
        this.setDepenedencies(dependencies);
    }
    
    setContents(contents) {

        if (!(contents instanceof Array)) {
            if (contents[0] instanceof BytesList) {
                this.opintents.setContentsList(contents.container);
            }
            return 'contents not valid';
        }

        if (contents.length == 0) {
            this.opintents.setContentsList(contents);
        }

        if(contents[0] instanceof Uint8Array) {
            this.opintents.setContentsList(contents);
        } else {
            return 'contents not valid';
        }
    }

    getContents() {
        return this.opintents.getContents();
    }

    setDepenedencies(dependencies) {

        if (!(dependencies instanceof Array)) {
            if (dependencies[0] instanceof BytesList) {
                this.opintents.setDepenedenciesList(dependencies.container);
            }
            return 'dependencies not valid';
        }

        if (dependencies.length == 0) {
            this.opintents.setDepenedenciesList(dependencies);
        }

        if(dependencies[0] instanceof Uint8Array) {
            this.opintents.setDepenedenciesList(dependencies);
        } else {
            return 'contents not valid';
        }
    }

    getDepenedencies() {
        return this.opintents.getDepenedencies();
    }
}

export default {
    OpIntents,
};

export {OpIntents};
