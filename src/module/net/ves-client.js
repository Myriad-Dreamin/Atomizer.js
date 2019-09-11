
import { UserRegisterRequest } from '@net-grpc/lib/uiprpc_pb';
import { VESClient } from '@net-grpc/lib/uiprpc_grpc_web_pb';
import base from '@module/grpc-uip/index';
import BaseRpc from '@net-grpc/lib/base_pb';

// service VES {
//     rpc UserRegister (UserRegisterRequest) returns (UserRegisterReply);

//     rpc SessionStart (SessionStartRequest) returns (SessionStartReply);
//     rpc SessionAckForInit (SessionAckForInitRequest) returns (SessionAckForInitReply);

//     rpc SessionRequireTransact (SessionRequireTransactRequest) returns (SessionRequireTransactReply);
//     rpc SessionRequireRawTransact (SessionRequireRawTransactRequest) returns (SessionRequireRawTransactReply);
//     rpc AttestationReceive (AttestationReceiveRequest) returns (AttestationReceiveReply);
//     rpc MerkleProofReceive (MerkleProofReceiveRequest) returns (MerkleProofReceiveReply);
//     rpc ShrotenMerkleProofReceive (ShortenMerkleProofReceiveRequest) returns (ShortenMerkleProofReceiveReply);
//     rpc InformAttestation (AttestationReceiveRequest) returns (AttestationReceiveReply);
//     rpc InformMerkleProof (MerkleProofReceiveRequest) returns (MerkleProofReceiveReply);
//     rpc InformShortenMerkleProof (ShortenMerkleProofReceiveRequest) returns (ShortenMerkleProofReceiveReply);
// }

/*
var account = new vclient.Account(); account.setChainId(1); account.getChainId(); account.setAddress("123"); account.showAddress();
var client = new vclient.Client("http://localhost:33004"); client.user_register(account, "000123");

vclient.hexbytes.HexToBytes("123")
*/

class Client {
    constructor(host) {
        this.client = new VESClient(host, null, null);
    }

    user_register(account, name) {
        let req = new UserRegisterRequest();

        if (account instanceof base.Account) {
            req.setAccount(account.account);
        } else if(account instanceof BaseRpc.Account) {
            req.setAccount(account);
        } else {
            return 'account not valid';
        }

        req.setUserName(name);
        this.client.userRegister(req, {}, (err, response) => {
            window.console.log(err, response.toObject());
        });
    }
}

export default {
    Client : Client,
    BaseRpc: BaseRpc,
};