import {WSClient} from '@/websocket/raw-client';
import {proto} from '@net-grpc/lib/proto';

// import {proto} from '@net-grpc/lib/proto';

import {BinaryEncoder} from '@third-party/binary-encoder/binary-encoder';
import hexbytes from '@module/util/hexbytes';


class WSRPCSerializer {
    constructor() {

    }


    /**
     *
     * @param msgid{number}
     * @param msg
     * @returns {ArrayBufferLike}
     * @constructor
     */
    Serialize(msgid, msg) {
        let qwq = new BinaryEncoder();
        qwq.writeUint16(msgid);
        let qwqqq = msg.serializeBinary();
        qwq.writeBytes(qwqqq);
        return qwq.end();
    }
}

const defaultWSRPCSerializer = new WSRPCSerializer();

class WSRPCClient {
    /**
     * @description
     * @author Myriad-Dreamin
     * @param host {string}
     * @param name {string}
     * @param serializer {WSRPCSerializer}
     * @param options {{onopen,onclose,onerror,on_string_message_receive,on_bytes_message_receive,before_message}}
     * @param options.binaryType {string}
     * @param options.onopen {Function<Event>}
     * @param options.onclose {Function<CloseEvent>}
     * @param options.onerror {Function<Event>}
     * @param options.on_string_message_receive {on_string_message_receive}
     * @param options.on_bytes_message_receive {on_bytes_message_receive}
     * @param options.before_message {PreMessageMiddleWare}
     */
    constructor(host, name, {serializer, options}) {

        this.serializer = serializer || defaultWSRPCSerializer;

        options.binaryType = options.binaryType || 'arraybuffer';

        let self = this;
        let smr = options.on_string_message_receive;
        if (smr) {
            options.on_string_message_receive = function(msg) {
                if(smr(msg)) return true;
                return self.processMessage(hexbytes.StringToBytes(msg));
            };
        } else {
            options.on_string_message_receive = function(msg) {
                return self.processMessage(hexbytes.StringToBytes(msg));
            };
        }

        let bmr = options.on_bytes_message_receive;
        if (bmr) {
            options.on_bytes_message_receive = function(msg) {
                if(bmr(msg)) return true;
                return self.processMessage(msg);
            };
        } else {
            options.on_bytes_message_receive = this.processMessage;
        }

        this.ws = new WSClient(host, options);
        this.name = name;
    }

    /**
     * @Description:
     * @author Myriad-Dreamin
     * @param code {string}
     * @param message {jspb.Message}
     */
    postMessage(code, message) {
        const buf = this.serializer.Serialize(code, message);

        if (buf instanceof Error) {
            return buf;
        }

        this.ws.send(buf);
    }

    /**
     * @description
     * @author Myriad-Dreamin
     * @param code {number}
     * @param dst {proto.uiprpc.base.Account}
     * @param message {jspb.Message}
     * @returns {Error}
     */
    postRawMessage(code, dst, message) {
        const buf = this.serializer.Serialize(code, message);

        if (buf instanceof Error) {
            return buf;
        }

        let rawMessage = new proto.wsrpc.RawMessage();
        rawMessage.setFrom(this.name);
        rawMessage.setTo(dst.serializeBinary());
        rawMessage.setContents(buf);
        return this.postMessage(proto.wsrpc.MessageID.CodeRawProto, rawMessage);
    }

    /**
     * @description
     * @author Myriad-Dreamin
     * @param dst {proto.uiprpc.base.Account}
     * @param msg {string|Uint8Array}
     * @returns {Error}
     */
    sendMessage(dst, msg) {
        let message = new proto.wsrpc.Message();
        message.setFrom(this.name);
        message.setTo(dst.serializeBinary());
        message.setContents(msg);
        return this.postMessage(proto.wsrpc.MessageID.CodeMessageRequest, message);
    }

    userRegister(acc) {
        let message = new proto.wsrpc.UserRegisterRequest();
        message.setAccount(acc);
        message.setUserName(this.name);
        return this.postMessage(proto.wsrpc.MessageID.CodeUserRegisterRequest, message);
    }
    // resetName(name) {
    //     this.name = name;
    // }

    processMessage(msg) {
        window.console.log(msg);
    }
}

export default {
    WSRPCClient,
};

export {WSRPCClient};
