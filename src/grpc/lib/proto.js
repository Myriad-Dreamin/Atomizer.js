import wsrpc_pb from './wsrpc_pb';
import uiprpc_grpc_web_pb from './uiprpc_grpc_web_pb';

import message_id from './message_id';

const proto = {};

proto.wsrpc = wsrpc_pb;
proto.uiprpc = uiprpc_grpc_web_pb;

proto.MessageID = message_id.MessageID;

export default {
    proto,
};

export {proto};