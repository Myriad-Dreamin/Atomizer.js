
import hexbytes from './hexbytes';

class BytesList extends Uint8Array {
    constructor(bytesList) {
        super();
        this.setBytesList(bytesList);
    }

    setBytesList(bytesList) {
        this.splice(0);
        for (let i = 0; i < bytesList.length; i++) {
            this.pushItem(bytesList[i]);
        }
    }

    getBytesList() {
        return this;
    }

    push(bytesContent) {
        if (bytesContent instanceof Array) {
            this.pushList(bytesContent);
        } else {
            this.pushItem(bytesContent);
        }
    }

    pushItem(bytesContent) {
        if (typeof bytesContent === 'string') {
            bytesContent = hexbytes.HexToBytes(bytesContent);
            if (bytesContent === null) {
                return Error('convert error');
            }
        } 

        return super.push(bytesContent);
    }

    pushList(bytesList) {
        for (let i = 0; i < bytesList.length; i++) {
            this.pushItem(bytesList[i]);
        }
    }
}

export default {
    BytesList,
};



