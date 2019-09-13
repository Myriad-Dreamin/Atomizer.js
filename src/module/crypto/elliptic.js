
import elliptic from 'elliptic';
import crypto from 'crypto';
import BN from 'bn.js';

// just Buffer
class EllipticPublicKey {
    constructor(kp) {
        this.kp = kp;
    }

    hex() {
        return this.kp.toString('hex');
    }

    bytes() {
        return this.kp;
    }
}

class EllipticECSDAPrivateKey {
    constructor(kp) {
        this.kp = kp;
    }

    hex() {
        return this.kp.getPrivate('hex');
    }

    bytes() {
        return this.kp.getPrivate().toBuffer();
    }

    public() {
        return new EllipticPublicKey(new BN(this.kp.getPublic().encode('array')).toBuffer());
    }

    sign(msg) {
        return new EllipticSignature(this.kp.sign(msg));
    }
}


class EllipticEDDSAPrivateKey {
    constructor(kp) {
        this.kp = kp;
    }

    hex() {
        return this.kp.getSecret('hex');
    }

    bytes() {
        return this.kp.getSecret();
    }

    public() {
        return new EllipticPublicKey(new BN(this.kp.getPublic()).toBuffer());
    }

    sign(msg) {
        return new EllipticSignature(this.kp.sign(msg));
    }
}

class EllipticSignature {
    constructor(sig) {
        this.sig = sig;
    }

    hex() {
        return this.sig.r.toString(16, 32) + this.sig.s.toString(16, 32);
    }

    bytes() {
        let mstr = this.hex();
        let b = [];
        for(let i=0;i<mstr.length;i+=2) {
            b.push(parseInt(mstr.substr(i, 2), 16));
        }
        return b;
    }
}

class ECSDA {
    constructor(ecsda_type) {
        this.ec = new elliptic.ec(ecsda_type);
    }

    generate() {
        return new EllipticECSDAPrivateKey(this.ec.genKeyPair());
    }

    fromPrivate(key) {
        return new EllipticECSDAPrivateKey(this.ec.keyFromPrivate(key));
    }

    sign(msg, key) {
        return new EllipticSignature(this.ec.sign(msg, key));
    }

    verify(msg, signature, pubkey) {
        return this.ec.verify(msg, signature, pubkey);
    }

    recover(msg, signature, j) {
        return new EllipticPublicKey(this.ec.recoverPubKey(msg,signature, j));
    }
}

class EDDSA {
    constructor(eddsa_type) {
        this.ed = new elliptic.eddsa(eddsa_type);
    }

    generate() {
        return new EllipticEDDSAPrivateKey(this.ed.keyFromSecret(crypto.randomBytes(64)));
    }

    fromPrivate(key) {
        return new EllipticEDDSAPrivateKey(this.ed.keyFromSecret(key));
    }

    sign(msg, key) {
        return new EllipticSignature(this.ed.sign(msg, key));
    }

    verify(msg, signature, pubkey) {
        return this.ed.verify(msg, signature, pubkey);
    }
}


export default {
    elliptic: elliptic,
    secp256k1: new ECSDA('secp256k1'),
    ed25519: new EDDSA('ed25519'),
};