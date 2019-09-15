
import elliptic from './elliptic';

/**
 * @Description:
 * @author Myriad-Dreamin
 * @param keyPair { Object,{chainID, privateKey} }
 * @returns {*}
 */
function fromKeyPair(keyPair) {
    switch (keyPair.chainID) {
    case 1: case 2:
        return elliptic.secp256k1.fromPrivate(keyPair.privateKey);
    case 3: case 4:
        return elliptic.ed25519.fromPrivate(keyPair.privateKey);
    }
}

export { fromKeyPair };

