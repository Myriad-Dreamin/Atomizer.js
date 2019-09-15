import {proto} from '@net-grpc/lib/proto';

class OpIntents extends proto.uiprpc.base.OpIntents {

    constructor(contents, dependencies, opt_data) {
        super(opt_data);
        this.setContent(contents);
        this.setDepenedencies(dependencies);
    }

    setContents(contents) {
        if (contents instanceof Uint8Array) {
            super.setContentsList(contents);
        } else {
            return 'contents not valid';
        }
    }

    setDepenedencies(dependencies) {
        if (dependencies instanceof Uint8Array) {
            super.setContentsList(dependencies);
        } else {
            return 'contents not valid';
        }
    }
}

export default {
    OpIntents,
};

export {OpIntents};
