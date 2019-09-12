
import hexbytes from './hexbytes';

class BytesList {
    constructor(bytesList) {
        this.container = new Uint8Array();
        this.setBytesList(bytesList);
    }

    setBytesList(bytesList) {
        for (let i = 0; i < bytesList.lengh; i++) {
            this.pushItem(bytesList[i]);
        }
    }

    getBytesList() {
        return this.container;
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
                return false;
            }
        } 

        return this.container.push(bytesContent);
    }

    pushList(bytesList) {
        for (let i = 0; i < bytesList.lengh; i++) {
            this.pushItem(bytesList[i]);
        }
    }
}

export default {
    BytesList,
};



