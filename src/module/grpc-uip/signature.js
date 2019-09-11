/*

message OpIntents {
    repeated bytes contents = 1;
    repeated bytes dependencies = 2;
}

message Transaction {
    uint64 chain_id = 1;
    bytes src = 2;
    bytes dst = 3;
    bytes domain = 4;
    bytes meta = 5;
}

message Signature {
    uint32 signature_type = 1;
    bytes content = 2;
}

message Attestation {
    uint64 chain_id = 1;
    bytes address = 2;
}


message MerkleProof {
    uint64 merkleproof_type = 1;
    // roothash is contented in proof
    bytes proof = 2;
    bytes key = 3;
    bytes value = 4;
}

message ShortenMerkleProof {
    uint64 merkleproof_type = 1;
    bytes roothash = 2;
    bytes key = 3;
    bytes value = 4;
}

*/
