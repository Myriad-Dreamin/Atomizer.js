import elliptic from 'elliptic';
import crypto from 'crypto';
import BN from 'bn';

// just Buffer
class EllipticPublicKey {

    /**
     * @Description:
     * @author Myriad-Dreamin
     * @param kp { Buffer }
     */
    constructor(kp) {
        this.kp = kp;
    }

    /**
     * @Description:
     * @author Myriad-Dreamin
     * @returns {string}
     */
    hex() {
        return this.kp.toString('hex');
    }

    /**
     * @Description:
     * @author Myriad-Dreamin
     * @returns {Buffer}
     */
    bytes() {
        return this.kp;
    }
}
class EllipticECSDAPrivateKey {

    /**
     * @Description:
     * @author Myriad-Dreamin
     * @param kp { KeyPair }
     */
    constructor(kp) {
        this.kp = kp;
    }

    /**
     * @Description:
     * @author Myriad-Dreamin
     * @returns { string }
     */
    hex() {
        return this.kp.getPrivate('hex');
    }

    /**
     * @Description:
     * @author Myriad-Dreamin
     * @returns { Buffer }
     */
    bytes() {
        return this.kp.getPrivate().toBuffer();
    }

    /**
     * @Description:
     * @author Myriad-Dreamin
     * @returns {EllipticPublicKey}
     */
    public() {
        return new EllipticPublicKey(new BN(this.kp.getPublic().encode('array')).toBuffer());
    }

    /**
     * @Description:
     * @author Myriad-Dreamin
     * @param msg {string|Uint8Array|Buffer?}
     * @returns {EllipticSignature}
     */
    sign(msg) {
        return new EllipticSignature(this.kp.sign(msg));
    }
}


class EllipticEDDSAPrivateKey {
    /**
     * @Description:
     * @author Myriad-Dreamin
     * @param kp {Buffer}
     */
    constructor(kp) {
        this.kp = kp;
    }

    /**
     * @Description:
     * @author Myriad-Dreamin
     * @return {string}
     */
    hex() {
        return this.kp.getSecret('hex');
    }

    /**
     * @Description:
     * @author Myriad-Dreamin
     * @return {Uint8Array}
     */
    bytes() {
        return this.kp.getSecret();
    }

    /**
     * @Description:
     * @author Myriad-Dreamin
     * @returns {EllipticPublicKey}
     */
    public() {
        return new EllipticPublicKey(new BN(this.kp.getPublic()).toBuffer());
    }

    /**
     * @Description:
     * @author Myriad-Dreamin
     * @param msg{string|Uint8Array}
     * @returns {EllipticSignature}
     */
    sign(msg) {
        return new EllipticSignature(this.kp.sign(msg));
    }
}

class EllipticSignature {
    /**
     * @Description:
     * @author Myriad-Dreamin
     * @param sig {Object, {r,s,v}}
     */
    constructor(sig) {
        this.sig = sig;
    }

    /**
     * @Description:
     * @author Myriad-Dreamin
     * @returns {string}
     */
    hex() {
        return this.sig.r.toString(16, 32) + this.sig.s.toString(16, 32);
    }

    /**
     * @Description:
     * @author Myriad-Dreamin
     * @returns {Uint8Array}
     */
    bytes() {
        let mstr = this.hex();
        let b = [];
        for (let i = 0; i < mstr.length; i += 2) {
            b.push(parseInt(mstr.substr(i, 2), 16));
        }
        return new Uint8Array(b);
    }
}

class ECSDA {
    /**
     * @Description:
     * @author Myriad-Dreamin
     * @param ecsda_type {string}
     */
    constructor(ecsda_type) {
        this.ec = new elliptic.ec(ecsda_type);
    }

    /**
     * @Description:
     * @author Myriad-Dreamin
     * @returns {EllipticECSDAPrivateKey}
     */
    generate() {
        return new EllipticECSDAPrivateKey(this.ec.genKeyPair());
    }

    /**
     * @Description:
     * @author Myriad-Dreamin
     * @param key{string|Uint8Array}
     * @returns {EllipticECSDAPrivateKey}
     */
    fromPrivate(key) {
        return new EllipticECSDAPrivateKey(this.ec.keyFromPrivate(key));
    }

    /**
     * @Description:
     * @author Myriad-Dreamin
     * @param msg{string|Uint8Array}
     * @param key{string|Uint8Array}
     * @returns {EllipticSignature}
     */
    sign(msg, key) {
        return new EllipticSignature(this.ec.sign(msg, key));
    }

    /**
     * @Description:
     * @author Myriad-Dreamin
     * @param msg{string|Uint8Array}
     * @param signature{string|Uint8Array}
     * @param pubkey{string|Uint8Array}
     * @returns {boolean|*}
     */
    verify(msg, signature, pubkey) {
        return this.ec.verify(msg, signature, pubkey);
    }

    /**
     * @Description:
     * @author Myriad-Dreamin
     * @param msg{string|Uint8Array}
     * @param signature{string|Uint8Array}
     * @param j{int}
     * @returns {EllipticPublicKey}
     */
    recover(msg, signature, j) {
        return new EllipticPublicKey(this.ec.recoverPubKey(msg, signature, j));
    }
}

class EDDSA {
    /**
     * @Description:
     * @author Myriad-Dreamin
     * @param eddsa_type{string}
     */
    constructor(eddsa_type) {
        this.ed = new elliptic.eddsa(eddsa_type);
    }

    /**
     * @Description:
     * @author Myriad-Dreamin
     * @returns {EllipticEDDSAPrivateKey}
     */
    generate() {
        return new EllipticEDDSAPrivateKey(this.ed.keyFromSecret(crypto.randomBytes(64)));
    }

    /**
     * @Description:
     * @author Myriad-Dreamin
     * @param key{string|Uint8Array}
     * @returns {EllipticEDDSAPrivateKey}
     */
    fromPrivate(key) {
        return new EllipticEDDSAPrivateKey(this.ed.keyFromSecret(key));
    }

    /**
     * @Description:
     * @author Myriad-Dreamin
     * @param msg{string|Uint8Array}
     * @param key{string|Uint8Array}
     * @returns {EllipticSignature}
     */
    sign(msg, key) {
        return new EllipticSignature(this.ed.sign(msg, key));
    }

    /**
     * @Description:
     * @author Myriad-Dreamin
     * @param msg{string|Uint8Array}
     * @param signature{string|Uint8Array}
     * @param pubkey{string|Uint8Array}
     * @returns {*|Boolean}
     */
    verify(msg, signature, pubkey) {
        return this.ed.verify(msg, signature, pubkey);
    }
}


export default {
    elliptic: elliptic,
    secp256k1: new ECSDA('secp256k1'),
    ed25519: new EDDSA('ed25519'),
};