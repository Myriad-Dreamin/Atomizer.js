
import { proto } from '@net-grpc/lib/proto';

import { VESClient } from '@net-grpc/lib/uiprpc_grpc_web_pb';
import base from '@module/grpc-uip/index';

/*

var account = new extended_proto.Account(); account.setChainId(1); account.getChainId(); account.setAddress("123"); account.showAddress();

instanceof

var client = new vclient.Client("http://localhost:33004"); client.user_register(account, "000123");

vclient.hexbytes.HexToBytes("123")
*/

function buildAttestationReceiveRequest(atte, session_id) {
    let req = new proto.uiprpc.AttestationReceiveRequest();


    if (atte instanceof base.Attestation) {
        req.setAtte(atte.atte);
    } else if(atte instanceof proto.uiprpc.base.Attestation) {
        req.setAtte(atte);
    } else {
        return 'attestation not valid';
    }

    req.setSessionId(session_id);
    return req;
}

function buildMerkleProofReceiveRequest(session_id, chain_id, merkleproof) {

    let req = new proto.uiprpc.MerkleProofReceiveRequest();


    if (merkleproof instanceof base.MerkleProof) {
        req.setMerkleproof(merkleproof.merkleproof);
    } else if(merkleproof instanceof proto.uiprpc.base.MerkleProof) {
        req.setMerkleproof(merkleproof);
    } else {
        return 'merkleproof not valid';
    }

    req.setChainId(chain_id);
    req.setSessionId(session_id);
    return req;
}


class Client {
    constructor(host) {
        this.client = new VESClient(host, null, null);
    }

    user_register(account, name) {
        let req = new proto.uiprpc.UserRegisterRequest();

        if (account instanceof base.Account) {
            req.setAccount(account.account);
        } else if(account instanceof proto.uiprpc.base.Account) {
            req.setAccount(account);
        } else {
            return 'account not valid';
        }

        req.setUserName(name);
        this.client.userRegister(req, {}, (err, response) => {
            window.console.log(err, response.toObject());
        });
    }

    session_start(opintents) {
        let req = new proto.uiprpc.SessionStartRequest();

        if (opintents instanceof base.OpIntents) {
            req.setOpintents(opintents.opintents);
        } else if(opintents instanceof proto.uiprpc.base.OpIntents) {
            req.setOpintents(opintents);
        } else {
            return 'opintents not valid';
        }

        this.client.sessionStart(req, {}, (err, response) => {
            window.console.log(err, response.toObject());
        });
    }

    session_ack_for_init(session_id, user, user_signature) {
        let req = new proto.uiprpc.SessionAckForInitRequest();

        if (user instanceof base.Account) {
            req.setAccount(user.account);
        } else if(user instanceof proto.uiprpc.base.Account) {
            req.setAccount(user);
        } else {
            return 'user not valid';
        }

        if (user_signature instanceof base.Signature) {
            req.setUserSignature(user_signature.signature);
        } else if(user_signature instanceof proto.uiprpc.base.Signature) {
            req.setUserSignature(user_signature);
        } else {
            return 'user_signature not valid';
        }

        req.setSessionId(session_id);
        this.client.sessionAckForInit(req, {}, (err, response) => {
            window.console.log(err, response.toObject());
        });
    }

    session_require_transact(session_id) {
        let req = new proto.uiprpc.SessionRequireTransactRequest();

        req.setSessionId(session_id);
        this.client.sessionRequireTransact(req, {}, (err, response) => {
            window.console.log(err, response.toObject());
        });
    }

    session_require_raw_transact(session_id) {
        let req = new proto.uiprpc.SessionRequireRawTransactRequest();

        req.setSessionId(session_id);
        this.client.sessionRequireRawTransact(req, {}, (err, response) => {
            window.console.log(err, response.toObject());
        });
    }

    attestation_receive(session_id, atte) {
        this.client.attestationReceive(
            buildAttestationReceiveRequest(session_id, atte), {}, (err, response) => {
                window.console.log(err, response.toObject());
            });
    }

    merkle_proof_receive(session_id, chain_id, merkleproof) {
        this.client.merkleProofReceive(
            buildMerkleProofReceiveRequest(session_id, chain_id, merkleproof), {}, (err, response) => {
                window.console.log(err, response.toObject());
            });
    }
    inform_attestation(session_id, atte) {
        this.client.informAttestation(
            buildAttestationReceiveRequest(session_id, atte), {}, (err, response) => {
                window.console.log(err, response.toObject());
            });
    }

    inform_merkle_proof(session_id, chain_id, merkleproof) {
        this.client.informMerkleProof(
            buildMerkleProofReceiveRequest(session_id, chain_id, merkleproof), {}, (err, response) => {
                window.console.log(err, response.toObject());
            });
    }
}

export default {
    Client : Client,
};