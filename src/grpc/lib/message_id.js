
var MessageID = {
    // CodeMessageRequest is from client to server, request for unicast its
    // message to other client
    CodeMessageRequest: 0,

    // CodeMessageReply is from server to client
    CodeMessageReply: 1,

    // CodeRawProto if from client to server
    CodeRawProto: 2,

    // CodeClientHelloRequest is from client to server
    CodeClientHelloRequest: 3,

    // CodeClientHelloReply is from server to client
    CodeClientHelloReply: 4, // 4

    // CodeRequestComingRequest is from server to client
    CodeRequestComingRequest: 5,

    // CodeRequestComingReply is from client to server
    CodeRequestComingReply: 6,

    // CodeRequestGrpcServiceRequest is from client to server
    CodeRequestGrpcServiceRequest: 7,

    // CodeRequestGrpcServiceReply is from server to client
    CodeRequestGrpcServiceReply: 8,

    // CodeRequestNsbServiceRequest is from client to server
    CodeRequestNsbServiceRequest: 9, // 9

    // CodeRequestNsbServiceReply is from server to client
    CodeRequestNsbServiceReply: 10,

    // CodeSessionListRequest is from client to server
    CodeSessionListRequest: 11,

    // CodeSessionListReply is from server to client
    CodeSessionListReply: 12,

    // CodeTransactionListRequest is from client to server
    CodeTransactionListRequest: 13,

    // CodeTransactionListReply is from server to client
    CodeTransactionListReply: 14, // 14

    // CodeUserRegisterRequest is from client to server
    CodeUserRegisterRequest: 15,

    // CodeUserRegisterReply is from server to client
    CodeUserRegisterReply: 16,

    // CodeSessionFinishedRequest is either from server to client or client to server
    CodeSessionFinishedRequest: 17,

    // CodeSessionFinishedReply is either from server to client or client to server
    CodeSessionFinishedReply: 18,

    // CodeSessionRequestForInitRequest is from server to client
    // CodeSessionRequestForInitRequest
    //
    // CodeSessionRequestForInitReply

    // CodeSessionRequireTransactRequest is either from server to client or client to server
    CodeSessionRequireTransactRequest: 19, // 19

    // CodeSessionRequireTransactReply is either from server to client or client to server
    CodeSessionRequireTransactReply: 20,

    // CodeAttestationReceiveRequest is either from server to client or client to server
    CodeAttestationReceiveRequest: 21,

    // CodeAttestationReceiveReply is either from server to client or client to server
    CodeAttestationReceiveReply: 22,

    // CodeAttestationSendingRequest is from server to client
    CodeAttestationSendingRequest: 23,

    // CodeAttestationSendingReply is client to server
    CodeAttestationSendingReply: 24, // 24

    // CodeCloseSessionRequest is from server to client
    CodeCloseSessionRequest: 25,

    // CodeCloseSessionReply is client to server
    CodeCloseSessionReply: 26,
};


if (Object.freeze) {
    Object.freeze(MessageID);
}

export default {
    MessageID
};


export { MessageID };
