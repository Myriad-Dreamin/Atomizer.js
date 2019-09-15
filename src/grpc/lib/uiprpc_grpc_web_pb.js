/* eslint-disable */
/**
 * @fileoverview gRPC-Web generated client stub for uiprpc
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!



const grpc = {};
grpc.web = require('grpc-web');


var base_pb = require('./base_pb.js');
const proto = {};
proto.uiprpc = require('./uiprpc_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.uiprpc.VESClient =
    function(hostname, credentials, options) {
        if (!options) options = {};
        options['format'] = 'text';

        /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
        this.client_ = new grpc.web.GrpcWebClientBase(options);

        /**
   * @private @const {string} The hostname
   */
        this.hostname_ = hostname;

        /**
   * @private @const {?Object} The credentials to be used to connect
   *    to the server
   */
        this.credentials_ = credentials;

        /**
   * @private @const {?Object} Options for the client
   */
        this.options_ = options;
    };


/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.uiprpc.VESPromiseClient =
    function(hostname, credentials, options) {
        if (!options) options = {};
        options['format'] = 'text';

        /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
        this.client_ = new grpc.web.GrpcWebClientBase(options);

        /**
   * @private @const {string} The hostname
   */
        this.hostname_ = hostname;

        /**
   * @private @const {?Object} The credentials to be used to connect
   *    to the server
   */
        this.credentials_ = credentials;

        /**
   * @private @const {?Object} Options for the client
   */
        this.options_ = options;
    };


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.uiprpc.UserRegisterRequest,
 *   !proto.uiprpc.UserRegisterReply>}
 */
const methodDescriptor_VES_UserRegister = new grpc.web.MethodDescriptor(
    '/uiprpc.VES/UserRegister',
    grpc.web.MethodType.UNARY,
    proto.uiprpc.UserRegisterRequest,
    proto.uiprpc.UserRegisterReply,
    /** @param {!proto.uiprpc.UserRegisterRequest} request */
    function(request) {
        return request.serializeBinary();
    },
    proto.uiprpc.UserRegisterReply.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.uiprpc.UserRegisterRequest,
 *   !proto.uiprpc.UserRegisterReply>}
 */
const methodInfo_VES_UserRegister = new grpc.web.AbstractClientBase.MethodInfo(
    proto.uiprpc.UserRegisterReply,
    /** @param {!proto.uiprpc.UserRegisterRequest} request */
    function(request) {
        return request.serializeBinary();
    },
    proto.uiprpc.UserRegisterReply.deserializeBinary
);


/**
 * @param {!proto.uiprpc.UserRegisterRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.uiprpc.UserRegisterReply)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.uiprpc.UserRegisterReply>|undefined}
 *     The XHR Node Readable Stream
 */
proto.uiprpc.VESClient.prototype.userRegister =
    function(request, metadata, callback) {
        return this.client_.rpcCall(this.hostname_ +
      '/uiprpc.VES/UserRegister',
        request,
        metadata || {},
        methodDescriptor_VES_UserRegister,
        callback);
    };


/**
 * @param {!proto.uiprpc.UserRegisterRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.uiprpc.UserRegisterReply>}
 *     A native promise that resolves to the response
 */
proto.uiprpc.VESPromiseClient.prototype.userRegister =
    function(request, metadata) {
        return this.client_.unaryCall(this.hostname_ +
      '/uiprpc.VES/UserRegister',
        request,
        metadata || {},
        methodDescriptor_VES_UserRegister);
    };


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.uiprpc.SessionStartRequest,
 *   !proto.uiprpc.SessionStartReply>}
 */
const methodDescriptor_VES_SessionStart = new grpc.web.MethodDescriptor(
    '/uiprpc.VES/SessionStart',
    grpc.web.MethodType.UNARY,
    proto.uiprpc.SessionStartRequest,
    proto.uiprpc.SessionStartReply,
    /** @param {!proto.uiprpc.SessionStartRequest} request */
    function(request) {
        return request.serializeBinary();
    },
    proto.uiprpc.SessionStartReply.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.uiprpc.SessionStartRequest,
 *   !proto.uiprpc.SessionStartReply>}
 */
const methodInfo_VES_SessionStart = new grpc.web.AbstractClientBase.MethodInfo(
    proto.uiprpc.SessionStartReply,
    /** @param {!proto.uiprpc.SessionStartRequest} request */
    function(request) {
        return request.serializeBinary();
    },
    proto.uiprpc.SessionStartReply.deserializeBinary
);


/**
 * @param {!proto.uiprpc.SessionStartRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.uiprpc.SessionStartReply)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.uiprpc.SessionStartReply>|undefined}
 *     The XHR Node Readable Stream
 */
proto.uiprpc.VESClient.prototype.sessionStart =
    function(request, metadata, callback) {
        return this.client_.rpcCall(this.hostname_ +
      '/uiprpc.VES/SessionStart',
        request,
        metadata || {},
        methodDescriptor_VES_SessionStart,
        callback);
    };


/**
 * @param {!proto.uiprpc.SessionStartRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.uiprpc.SessionStartReply>}
 *     A native promise that resolves to the response
 */
proto.uiprpc.VESPromiseClient.prototype.sessionStart =
    function(request, metadata) {
        return this.client_.unaryCall(this.hostname_ +
      '/uiprpc.VES/SessionStart',
        request,
        metadata || {},
        methodDescriptor_VES_SessionStart);
    };


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.uiprpc.SessionAckForInitRequest,
 *   !proto.uiprpc.SessionAckForInitReply>}
 */
const methodDescriptor_VES_SessionAckForInit = new grpc.web.MethodDescriptor(
    '/uiprpc.VES/SessionAckForInit',
    grpc.web.MethodType.UNARY,
    proto.uiprpc.SessionAckForInitRequest,
    proto.uiprpc.SessionAckForInitReply,
    /** @param {!proto.uiprpc.SessionAckForInitRequest} request */
    function(request) {
        return request.serializeBinary();
    },
    proto.uiprpc.SessionAckForInitReply.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.uiprpc.SessionAckForInitRequest,
 *   !proto.uiprpc.SessionAckForInitReply>}
 */
const methodInfo_VES_SessionAckForInit = new grpc.web.AbstractClientBase.MethodInfo(
    proto.uiprpc.SessionAckForInitReply,
    /** @param {!proto.uiprpc.SessionAckForInitRequest} request */
    function(request) {
        return request.serializeBinary();
    },
    proto.uiprpc.SessionAckForInitReply.deserializeBinary
);


/**
 * @param {!proto.uiprpc.SessionAckForInitRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.uiprpc.SessionAckForInitReply)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.uiprpc.SessionAckForInitReply>|undefined}
 *     The XHR Node Readable Stream
 */
proto.uiprpc.VESClient.prototype.sessionAckForInit =
    function(request, metadata, callback) {
        return this.client_.rpcCall(this.hostname_ +
      '/uiprpc.VES/SessionAckForInit',
        request,
        metadata || {},
        methodDescriptor_VES_SessionAckForInit,
        callback);
    };


/**
 * @param {!proto.uiprpc.SessionAckForInitRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.uiprpc.SessionAckForInitReply>}
 *     A native promise that resolves to the response
 */
proto.uiprpc.VESPromiseClient.prototype.sessionAckForInit =
    function(request, metadata) {
        return this.client_.unaryCall(this.hostname_ +
      '/uiprpc.VES/SessionAckForInit',
        request,
        metadata || {},
        methodDescriptor_VES_SessionAckForInit);
    };


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.uiprpc.SessionRequireTransactRequest,
 *   !proto.uiprpc.SessionRequireTransactReply>}
 */
const methodDescriptor_VES_SessionRequireTransact = new grpc.web.MethodDescriptor(
    '/uiprpc.VES/SessionRequireTransact',
    grpc.web.MethodType.UNARY,
    proto.uiprpc.SessionRequireTransactRequest,
    proto.uiprpc.SessionRequireTransactReply,
    /** @param {!proto.uiprpc.SessionRequireTransactRequest} request */
    function(request) {
        return request.serializeBinary();
    },
    proto.uiprpc.SessionRequireTransactReply.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.uiprpc.SessionRequireTransactRequest,
 *   !proto.uiprpc.SessionRequireTransactReply>}
 */
const methodInfo_VES_SessionRequireTransact = new grpc.web.AbstractClientBase.MethodInfo(
    proto.uiprpc.SessionRequireTransactReply,
    /** @param {!proto.uiprpc.SessionRequireTransactRequest} request */
    function(request) {
        return request.serializeBinary();
    },
    proto.uiprpc.SessionRequireTransactReply.deserializeBinary
);


/**
 * @param {!proto.uiprpc.SessionRequireTransactRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.uiprpc.SessionRequireTransactReply)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.uiprpc.SessionRequireTransactReply>|undefined}
 *     The XHR Node Readable Stream
 */
proto.uiprpc.VESClient.prototype.sessionRequireTransact =
    function(request, metadata, callback) {
        return this.client_.rpcCall(this.hostname_ +
      '/uiprpc.VES/SessionRequireTransact',
        request,
        metadata || {},
        methodDescriptor_VES_SessionRequireTransact,
        callback);
    };


/**
 * @param {!proto.uiprpc.SessionRequireTransactRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.uiprpc.SessionRequireTransactReply>}
 *     A native promise that resolves to the response
 */
proto.uiprpc.VESPromiseClient.prototype.sessionRequireTransact =
    function(request, metadata) {
        return this.client_.unaryCall(this.hostname_ +
      '/uiprpc.VES/SessionRequireTransact',
        request,
        metadata || {},
        methodDescriptor_VES_SessionRequireTransact);
    };


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.uiprpc.SessionRequireRawTransactRequest,
 *   !proto.uiprpc.SessionRequireRawTransactReply>}
 */
const methodDescriptor_VES_SessionRequireRawTransact = new grpc.web.MethodDescriptor(
    '/uiprpc.VES/SessionRequireRawTransact',
    grpc.web.MethodType.UNARY,
    proto.uiprpc.SessionRequireRawTransactRequest,
    proto.uiprpc.SessionRequireRawTransactReply,
    /** @param {!proto.uiprpc.SessionRequireRawTransactRequest} request */
    function(request) {
        return request.serializeBinary();
    },
    proto.uiprpc.SessionRequireRawTransactReply.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.uiprpc.SessionRequireRawTransactRequest,
 *   !proto.uiprpc.SessionRequireRawTransactReply>}
 */
const methodInfo_VES_SessionRequireRawTransact = new grpc.web.AbstractClientBase.MethodInfo(
    proto.uiprpc.SessionRequireRawTransactReply,
    /** @param {!proto.uiprpc.SessionRequireRawTransactRequest} request */
    function(request) {
        return request.serializeBinary();
    },
    proto.uiprpc.SessionRequireRawTransactReply.deserializeBinary
);


/**
 * @param {!proto.uiprpc.SessionRequireRawTransactRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.uiprpc.SessionRequireRawTransactReply)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.uiprpc.SessionRequireRawTransactReply>|undefined}
 *     The XHR Node Readable Stream
 */
proto.uiprpc.VESClient.prototype.sessionRequireRawTransact =
    function(request, metadata, callback) {
        return this.client_.rpcCall(this.hostname_ +
      '/uiprpc.VES/SessionRequireRawTransact',
        request,
        metadata || {},
        methodDescriptor_VES_SessionRequireRawTransact,
        callback);
    };


/**
 * @param {!proto.uiprpc.SessionRequireRawTransactRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.uiprpc.SessionRequireRawTransactReply>}
 *     A native promise that resolves to the response
 */
proto.uiprpc.VESPromiseClient.prototype.sessionRequireRawTransact =
    function(request, metadata) {
        return this.client_.unaryCall(this.hostname_ +
      '/uiprpc.VES/SessionRequireRawTransact',
        request,
        metadata || {},
        methodDescriptor_VES_SessionRequireRawTransact);
    };


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.uiprpc.AttestationReceiveRequest,
 *   !proto.uiprpc.AttestationReceiveReply>}
 */
const methodDescriptor_VES_AttestationReceive = new grpc.web.MethodDescriptor(
    '/uiprpc.VES/AttestationReceive',
    grpc.web.MethodType.UNARY,
    proto.uiprpc.AttestationReceiveRequest,
    proto.uiprpc.AttestationReceiveReply,
    /** @param {!proto.uiprpc.AttestationReceiveRequest} request */
    function(request) {
        return request.serializeBinary();
    },
    proto.uiprpc.AttestationReceiveReply.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.uiprpc.AttestationReceiveRequest,
 *   !proto.uiprpc.AttestationReceiveReply>}
 */
const methodInfo_VES_AttestationReceive = new grpc.web.AbstractClientBase.MethodInfo(
    proto.uiprpc.AttestationReceiveReply,
    /** @param {!proto.uiprpc.AttestationReceiveRequest} request */
    function(request) {
        return request.serializeBinary();
    },
    proto.uiprpc.AttestationReceiveReply.deserializeBinary
);


/**
 * @param {string|proto.uiprpc.MerkleProofReceiveRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.uiprpc.AttestationReceiveReply)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.uiprpc.AttestationReceiveReply>|undefined}
 *     The XHR Node Readable Stream
 */
proto.uiprpc.VESClient.prototype.attestationReceive =
    function(request, metadata, callback) {
        return this.client_.rpcCall(this.hostname_ +
      '/uiprpc.VES/AttestationReceive',
        request,
        metadata || {},
        methodDescriptor_VES_AttestationReceive,
        callback);
    };


/**
 * @param {!proto.uiprpc.AttestationReceiveRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.uiprpc.AttestationReceiveReply>}
 *     A native promise that resolves to the response
 */
proto.uiprpc.VESPromiseClient.prototype.attestationReceive =
    function(request, metadata) {
        return this.client_.unaryCall(this.hostname_ +
      '/uiprpc.VES/AttestationReceive',
        request,
        metadata || {},
        methodDescriptor_VES_AttestationReceive);
    };


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.uiprpc.MerkleProofReceiveRequest,
 *   !proto.uiprpc.MerkleProofReceiveReply>}
 */
const methodDescriptor_VES_MerkleProofReceive = new grpc.web.MethodDescriptor(
    '/uiprpc.VES/MerkleProofReceive',
    grpc.web.MethodType.UNARY,
    proto.uiprpc.MerkleProofReceiveRequest,
    proto.uiprpc.MerkleProofReceiveReply,
    /** @param {!proto.uiprpc.MerkleProofReceiveRequest} request */
    function(request) {
        return request.serializeBinary();
    },
    proto.uiprpc.MerkleProofReceiveReply.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.uiprpc.MerkleProofReceiveRequest,
 *   !proto.uiprpc.MerkleProofReceiveReply>}
 */
const methodInfo_VES_MerkleProofReceive = new grpc.web.AbstractClientBase.MethodInfo(
    proto.uiprpc.MerkleProofReceiveReply,
    /** @param {!proto.uiprpc.MerkleProofReceiveRequest} request */
    function(request) {
        return request.serializeBinary();
    },
    proto.uiprpc.MerkleProofReceiveReply.deserializeBinary
);


/**
 * @param {!proto.uiprpc.MerkleProofReceiveRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.uiprpc.MerkleProofReceiveReply)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.uiprpc.MerkleProofReceiveReply>|undefined}
 *     The XHR Node Readable Stream
 */
proto.uiprpc.VESClient.prototype.merkleProofReceive =
    function(request, metadata, callback) {
        return this.client_.rpcCall(this.hostname_ +
      '/uiprpc.VES/MerkleProofReceive',
        request,
        metadata || {},
        methodDescriptor_VES_MerkleProofReceive,
        callback);
    };


/**
 * @param {!proto.uiprpc.MerkleProofReceiveRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.uiprpc.MerkleProofReceiveReply>}
 *     A native promise that resolves to the response
 */
proto.uiprpc.VESPromiseClient.prototype.merkleProofReceive =
    function(request, metadata) {
        return this.client_.unaryCall(this.hostname_ +
      '/uiprpc.VES/MerkleProofReceive',
        request,
        metadata || {},
        methodDescriptor_VES_MerkleProofReceive);
    };


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.uiprpc.ShortenMerkleProofReceiveRequest,
 *   !proto.uiprpc.ShortenMerkleProofReceiveReply>}
 */
const methodDescriptor_VES_ShrotenMerkleProofReceive = new grpc.web.MethodDescriptor(
    '/uiprpc.VES/ShrotenMerkleProofReceive',
    grpc.web.MethodType.UNARY,
    proto.uiprpc.ShortenMerkleProofReceiveRequest,
    proto.uiprpc.ShortenMerkleProofReceiveReply,
    /** @param {!proto.uiprpc.ShortenMerkleProofReceiveRequest} request */
    function(request) {
        return request.serializeBinary();
    },
    proto.uiprpc.ShortenMerkleProofReceiveReply.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.uiprpc.ShortenMerkleProofReceiveRequest,
 *   !proto.uiprpc.ShortenMerkleProofReceiveReply>}
 */
const methodInfo_VES_ShrotenMerkleProofReceive = new grpc.web.AbstractClientBase.MethodInfo(
    proto.uiprpc.ShortenMerkleProofReceiveReply,
    /** @param {!proto.uiprpc.ShortenMerkleProofReceiveRequest} request */
    function(request) {
        return request.serializeBinary();
    },
    proto.uiprpc.ShortenMerkleProofReceiveReply.deserializeBinary
);


/**
 * @param {!proto.uiprpc.ShortenMerkleProofReceiveRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.uiprpc.ShortenMerkleProofReceiveReply)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.uiprpc.ShortenMerkleProofReceiveReply>|undefined}
 *     The XHR Node Readable Stream
 */
proto.uiprpc.VESClient.prototype.shrotenMerkleProofReceive =
    function(request, metadata, callback) {
        return this.client_.rpcCall(this.hostname_ +
      '/uiprpc.VES/ShrotenMerkleProofReceive',
        request,
        metadata || {},
        methodDescriptor_VES_ShrotenMerkleProofReceive,
        callback);
    };


/**
 * @param {!proto.uiprpc.ShortenMerkleProofReceiveRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.uiprpc.ShortenMerkleProofReceiveReply>}
 *     A native promise that resolves to the response
 */
proto.uiprpc.VESPromiseClient.prototype.shrotenMerkleProofReceive =
    function(request, metadata) {
        return this.client_.unaryCall(this.hostname_ +
      '/uiprpc.VES/ShrotenMerkleProofReceive',
        request,
        metadata || {},
        methodDescriptor_VES_ShrotenMerkleProofReceive);
    };


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.uiprpc.AttestationReceiveRequest,
 *   !proto.uiprpc.AttestationReceiveReply>}
 */
const methodDescriptor_VES_InformAttestation = new grpc.web.MethodDescriptor(
    '/uiprpc.VES/InformAttestation',
    grpc.web.MethodType.UNARY,
    proto.uiprpc.AttestationReceiveRequest,
    proto.uiprpc.AttestationReceiveReply,
    /** @param {!proto.uiprpc.AttestationReceiveRequest} request */
    function(request) {
        return request.serializeBinary();
    },
    proto.uiprpc.AttestationReceiveReply.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.uiprpc.AttestationReceiveRequest,
 *   !proto.uiprpc.AttestationReceiveReply>}
 */
const methodInfo_VES_InformAttestation = new grpc.web.AbstractClientBase.MethodInfo(
    proto.uiprpc.AttestationReceiveReply,
    /** @param {!proto.uiprpc.AttestationReceiveRequest} request */
    function(request) {
        return request.serializeBinary();
    },
    proto.uiprpc.AttestationReceiveReply.deserializeBinary
);


/**
 * @param {string|proto.uiprpc.MerkleProofReceiveRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.uiprpc.AttestationReceiveReply)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.uiprpc.AttestationReceiveReply>|undefined}
 *     The XHR Node Readable Stream
 */
proto.uiprpc.VESClient.prototype.informAttestation =
    function(request, metadata, callback) {
        return this.client_.rpcCall(this.hostname_ +
      '/uiprpc.VES/InformAttestation',
        request,
        metadata || {},
        methodDescriptor_VES_InformAttestation,
        callback);
    };


/**
 * @param {!proto.uiprpc.AttestationReceiveRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.uiprpc.AttestationReceiveReply>}
 *     A native promise that resolves to the response
 */
proto.uiprpc.VESPromiseClient.prototype.informAttestation =
    function(request, metadata) {
        return this.client_.unaryCall(this.hostname_ +
      '/uiprpc.VES/InformAttestation',
        request,
        metadata || {},
        methodDescriptor_VES_InformAttestation);
    };


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.uiprpc.MerkleProofReceiveRequest,
 *   !proto.uiprpc.MerkleProofReceiveReply>}
 */
const methodDescriptor_VES_InformMerkleProof = new grpc.web.MethodDescriptor(
    '/uiprpc.VES/InformMerkleProof',
    grpc.web.MethodType.UNARY,
    proto.uiprpc.MerkleProofReceiveRequest,
    proto.uiprpc.MerkleProofReceiveReply,
    /** @param {!proto.uiprpc.MerkleProofReceiveRequest} request */
    function(request) {
        return request.serializeBinary();
    },
    proto.uiprpc.MerkleProofReceiveReply.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.uiprpc.MerkleProofReceiveRequest,
 *   !proto.uiprpc.MerkleProofReceiveReply>}
 */
const methodInfo_VES_InformMerkleProof = new grpc.web.AbstractClientBase.MethodInfo(
    proto.uiprpc.MerkleProofReceiveReply,
    /** @param {!proto.uiprpc.MerkleProofReceiveRequest} request */
    function(request) {
        return request.serializeBinary();
    },
    proto.uiprpc.MerkleProofReceiveReply.deserializeBinary
);


/**
 * @param {!proto.uiprpc.MerkleProofReceiveRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.uiprpc.MerkleProofReceiveReply)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.uiprpc.MerkleProofReceiveReply>|undefined}
 *     The XHR Node Readable Stream
 */
proto.uiprpc.VESClient.prototype.informMerkleProof =
    function(request, metadata, callback) {
        return this.client_.rpcCall(this.hostname_ +
      '/uiprpc.VES/InformMerkleProof',
        request,
        metadata || {},
        methodDescriptor_VES_InformMerkleProof,
        callback);
    };


/**
 * @param {!proto.uiprpc.MerkleProofReceiveRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.uiprpc.MerkleProofReceiveReply>}
 *     A native promise that resolves to the response
 */
proto.uiprpc.VESPromiseClient.prototype.informMerkleProof =
    function(request, metadata) {
        return this.client_.unaryCall(this.hostname_ +
      '/uiprpc.VES/InformMerkleProof',
        request,
        metadata || {},
        methodDescriptor_VES_InformMerkleProof);
    };


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.uiprpc.ShortenMerkleProofReceiveRequest,
 *   !proto.uiprpc.ShortenMerkleProofReceiveReply>}
 */
const methodDescriptor_VES_InformShortenMerkleProof = new grpc.web.MethodDescriptor(
    '/uiprpc.VES/InformShortenMerkleProof',
    grpc.web.MethodType.UNARY,
    proto.uiprpc.ShortenMerkleProofReceiveRequest,
    proto.uiprpc.ShortenMerkleProofReceiveReply,
    /** @param {!proto.uiprpc.ShortenMerkleProofReceiveRequest} request */
    function(request) {
        return request.serializeBinary();
    },
    proto.uiprpc.ShortenMerkleProofReceiveReply.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.uiprpc.ShortenMerkleProofReceiveRequest,
 *   !proto.uiprpc.ShortenMerkleProofReceiveReply>}
 */
const methodInfo_VES_InformShortenMerkleProof = new grpc.web.AbstractClientBase.MethodInfo(
    proto.uiprpc.ShortenMerkleProofReceiveReply,
    /** @param {!proto.uiprpc.ShortenMerkleProofReceiveRequest} request */
    function(request) {
        return request.serializeBinary();
    },
    proto.uiprpc.ShortenMerkleProofReceiveReply.deserializeBinary
);


/**
 * @param {!proto.uiprpc.ShortenMerkleProofReceiveRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.uiprpc.ShortenMerkleProofReceiveReply)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.uiprpc.ShortenMerkleProofReceiveReply>|undefined}
 *     The XHR Node Readable Stream
 */
proto.uiprpc.VESClient.prototype.informShortenMerkleProof =
    function(request, metadata, callback) {
        return this.client_.rpcCall(this.hostname_ +
      '/uiprpc.VES/InformShortenMerkleProof',
        request,
        metadata || {},
        methodDescriptor_VES_InformShortenMerkleProof,
        callback);
    };


/**
 * @param {!proto.uiprpc.ShortenMerkleProofReceiveRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.uiprpc.ShortenMerkleProofReceiveReply>}
 *     A native promise that resolves to the response
 */
proto.uiprpc.VESPromiseClient.prototype.informShortenMerkleProof =
    function(request, metadata) {
        return this.client_.unaryCall(this.hostname_ +
      '/uiprpc.VES/InformShortenMerkleProof',
        request,
        metadata || {},
        methodDescriptor_VES_InformShortenMerkleProof);
    };


/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.uiprpc.CenteredVESClient =
    function(hostname, credentials, options) {
        if (!options) options = {};
        options['format'] = 'text';

        /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
        this.client_ = new grpc.web.GrpcWebClientBase(options);

        /**
   * @private @const {string} The hostname
   */
        this.hostname_ = hostname;

        /**
   * @private @const {?Object} The credentials to be used to connect
   *    to the server
   */
        this.credentials_ = credentials;

        /**
   * @private @const {?Object} Options for the client
   */
        this.options_ = options;
    };


/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.uiprpc.CenteredVESPromiseClient =
    function(hostname, credentials, options) {
        if (!options) options = {};
        options['format'] = 'text';

        /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
        this.client_ = new grpc.web.GrpcWebClientBase(options);

        /**
   * @private @const {string} The hostname
   */
        this.hostname_ = hostname;

        /**
   * @private @const {?Object} The credentials to be used to connect
   *    to the server
   */
        this.credentials_ = credentials;

        /**
   * @private @const {?Object} Options for the client
   */
        this.options_ = options;
    };


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.uiprpc.InternalRequestComingRequest,
 *   !proto.uiprpc.InternalRequestComingReply>}
 */
const methodDescriptor_CenteredVES_InternalRequestComing = new grpc.web.MethodDescriptor(
    '/uiprpc.CenteredVES/InternalRequestComing',
    grpc.web.MethodType.UNARY,
    proto.uiprpc.InternalRequestComingRequest,
    proto.uiprpc.InternalRequestComingReply,
    /** @param {!proto.uiprpc.InternalRequestComingRequest} request */
    function(request) {
        return request.serializeBinary();
    },
    proto.uiprpc.InternalRequestComingReply.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.uiprpc.InternalRequestComingRequest,
 *   !proto.uiprpc.InternalRequestComingReply>}
 */
const methodInfo_CenteredVES_InternalRequestComing = new grpc.web.AbstractClientBase.MethodInfo(
    proto.uiprpc.InternalRequestComingReply,
    /** @param {!proto.uiprpc.InternalRequestComingRequest} request */
    function(request) {
        return request.serializeBinary();
    },
    proto.uiprpc.InternalRequestComingReply.deserializeBinary
);


/**
 * @param {!proto.uiprpc.InternalRequestComingRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.uiprpc.InternalRequestComingReply)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.uiprpc.InternalRequestComingReply>|undefined}
 *     The XHR Node Readable Stream
 */
proto.uiprpc.CenteredVESClient.prototype.internalRequestComing =
    function(request, metadata, callback) {
        return this.client_.rpcCall(this.hostname_ +
      '/uiprpc.CenteredVES/InternalRequestComing',
        request,
        metadata || {},
        methodDescriptor_CenteredVES_InternalRequestComing,
        callback);
    };


/**
 * @param {!proto.uiprpc.InternalRequestComingRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.uiprpc.InternalRequestComingReply>}
 *     A native promise that resolves to the response
 */
proto.uiprpc.CenteredVESPromiseClient.prototype.internalRequestComing =
    function(request, metadata) {
        return this.client_.unaryCall(this.hostname_ +
      '/uiprpc.CenteredVES/InternalRequestComing',
        request,
        metadata || {},
        methodDescriptor_CenteredVES_InternalRequestComing);
    };


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.uiprpc.InternalRequestComingRequest,
 *   !proto.uiprpc.InternalRequestComingReply>}
 */
const methodDescriptor_CenteredVES_InternalAttestationSending = new grpc.web.MethodDescriptor(
    '/uiprpc.CenteredVES/InternalAttestationSending',
    grpc.web.MethodType.UNARY,
    proto.uiprpc.InternalRequestComingRequest,
    proto.uiprpc.InternalRequestComingReply,
    /** @param {!proto.uiprpc.InternalRequestComingRequest} request */
    function(request) {
        return request.serializeBinary();
    },
    proto.uiprpc.InternalRequestComingReply.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.uiprpc.InternalRequestComingRequest,
 *   !proto.uiprpc.InternalRequestComingReply>}
 */
const methodInfo_CenteredVES_InternalAttestationSending = new grpc.web.AbstractClientBase.MethodInfo(
    proto.uiprpc.InternalRequestComingReply,
    /** @param {!proto.uiprpc.InternalRequestComingRequest} request */
    function(request) {
        return request.serializeBinary();
    },
    proto.uiprpc.InternalRequestComingReply.deserializeBinary
);


/**
 * @param {!proto.uiprpc.InternalRequestComingRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.uiprpc.InternalRequestComingReply)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.uiprpc.InternalRequestComingReply>|undefined}
 *     The XHR Node Readable Stream
 */
proto.uiprpc.CenteredVESClient.prototype.internalAttestationSending =
    function(request, metadata, callback) {
        return this.client_.rpcCall(this.hostname_ +
      '/uiprpc.CenteredVES/InternalAttestationSending',
        request,
        metadata || {},
        methodDescriptor_CenteredVES_InternalAttestationSending,
        callback);
    };


/**
 * @param {!proto.uiprpc.InternalRequestComingRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.uiprpc.InternalRequestComingReply>}
 *     A native promise that resolves to the response
 */
proto.uiprpc.CenteredVESPromiseClient.prototype.internalAttestationSending =
    function(request, metadata) {
        return this.client_.unaryCall(this.hostname_ +
      '/uiprpc.CenteredVES/InternalAttestationSending',
        request,
        metadata || {},
        methodDescriptor_CenteredVES_InternalAttestationSending);
    };


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.uiprpc.InternalCloseSessionRequest,
 *   !proto.uiprpc.InternalCloseSessionReply>}
 */
const methodDescriptor_CenteredVES_InternalCloseSession = new grpc.web.MethodDescriptor(
    '/uiprpc.CenteredVES/InternalCloseSession',
    grpc.web.MethodType.UNARY,
    proto.uiprpc.InternalCloseSessionRequest,
    proto.uiprpc.InternalCloseSessionReply,
    /** @param {!proto.uiprpc.InternalCloseSessionRequest} request */
    function(request) {
        return request.serializeBinary();
    },
    proto.uiprpc.InternalCloseSessionReply.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.uiprpc.InternalCloseSessionRequest,
 *   !proto.uiprpc.InternalCloseSessionReply>}
 */
const methodInfo_CenteredVES_InternalCloseSession = new grpc.web.AbstractClientBase.MethodInfo(
    proto.uiprpc.InternalCloseSessionReply,
    /** @param {!proto.uiprpc.InternalCloseSessionRequest} request */
    function(request) {
        return request.serializeBinary();
    },
    proto.uiprpc.InternalCloseSessionReply.deserializeBinary
);


/**
 * @param {!proto.uiprpc.InternalCloseSessionRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.uiprpc.InternalCloseSessionReply)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.uiprpc.InternalCloseSessionReply>|undefined}
 *     The XHR Node Readable Stream
 */
proto.uiprpc.CenteredVESClient.prototype.internalCloseSession =
    function(request, metadata, callback) {
        return this.client_.rpcCall(this.hostname_ +
      '/uiprpc.CenteredVES/InternalCloseSession',
        request,
        metadata || {},
        methodDescriptor_CenteredVES_InternalCloseSession,
        callback);
    };


/**
 * @param {!proto.uiprpc.InternalCloseSessionRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.uiprpc.InternalCloseSessionReply>}
 *     A native promise that resolves to the response
 */
proto.uiprpc.CenteredVESPromiseClient.prototype.internalCloseSession =
    function(request, metadata) {
        return this.client_.unaryCall(this.hostname_ +
      '/uiprpc.CenteredVES/InternalCloseSession',
        request,
        metadata || {},
        methodDescriptor_CenteredVES_InternalCloseSession);
    };


module.exports = proto.uiprpc;

