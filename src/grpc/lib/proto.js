import wsrpc_pb from './wsrpc_pb';
import uiprpc_grpc_web_pb from './uiprpc_grpc_web_pb';
import nsbrpc_pb from './nsbrpc_pb';

import message_id from './message_id';

const proto = {};

proto.wsrpc = wsrpc_pb;
proto.wsrpc.MessageID = message_id.MessageID;

proto.uiprpc = uiprpc_grpc_web_pb;

proto.nsbrpc = nsbrpc_pb;


export default {
    proto,
};

export {proto};