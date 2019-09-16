
/*
*
*
func (vc *VesClient) postMessage(code wsrpc.MessageType, msg proto.Message) error {
	buf, err := wsrpc.GetDefaultSerializer().Serial(code, msg)
	if err != nil {
		fmt.Println(err)
		return err
	}
	vc.conn.WriteMessage(websocket.BinaryMessage, buf.Bytes())
	wsrpc.GetDefaultSerializer().Put(buf)
	return nil
}

func (vc *VesClient) postRawMessage(code wsrpc.MessageType, dst *uipbase.Account, msg proto.Message) error {

	buf, err := wsrpc.GetDefaultSerializer().Serial(code, msg)
	/// fmt.Println(buf.Bytes())
	if err != nil {
		fmt.Println(err)
		return err
	}
	var s = vc.getRawMessage()
	s.To, err = proto.Marshal(dst)
	if err != nil {
		fmt.Println(err)
		return err
	}
	s.From = vc.name
	s.Contents = make([]byte, buf.Len())
	copy(s.Contents, buf.Bytes())
	// fmt.Println(s.Contents)
	wsrpc.GetDefaultSerializer().Put(buf)
	return vc.postMessage(wsrpc.CodeRawProto, s)
}
*/


// function defaultonOpen(e)

import hexbytes from '@module/util/hexbytes';

/**
 * @Description:
 * @author Myriad-Dreamin
 * @callback on_string_message_receive
 * @param {string} msg
 * @return {boolean}
 */

/**
 * @Description:
 * @author Myriad-Dreamin
 * @callback on_bytes_message_receive
 * @param {ArrayBuffer} msg
 * @return {boolean}
 */

/**
 * @Description:
 * @author Myriad-Dreamin
 * @callback pre_message_middleware
 * @param {string|ArrayBuffer} msg
 * @return {string|ArrayBuffer}
 */

/**
 * @Description:
 * @author Myriad-Dreamin
 * @callback suf_message_middleware
 * @param {string|ArrayBuffer} msg
 * @return {*|string|ArrayBuffer}
 */


/**
 * @description
 * @author Myriad-Dreamin
 */
function PreMessageMiddleWare() {
    let self = (msg) => {return self.wrap(msg);};
    self.wrap = (msg) => {return msg;};
    /**
     * @description
     * @author Myriad-Dreamin
     * @param middleware {pre_message_middleware}
     */
    self.wrapBeforeMessage = (middleware) => {
        let pre_middleware = self.wrap;
        self.wrap = (msg) => {
            return middleware(pre_middleware(msg));
        };
    };
    return self;
}

const defaultMiddleWare = new PreMessageMiddleWare();

class WSClient extends WebSocket {

    /**
     * @Description:
     * @author Myriad-Dreamin
     * @param host {string}
     * @param protocols {string|string[]}
     * @param binaryType {string}
     * @param onopen {Function<Event>}
     * @param onclose {Function<CloseEvent>}
     * @param onerror {Function<Event>}
     *
     * @param on_string_message_receive {on_string_message_receive}
     * @param on_bytes_message_receive {on_bytes_message_receive}
     * @param before_message {PreMessageMiddleWare}
     // * @param after_message {suf_message_middleware}
     */
    constructor(host, {protocols, binaryType, onopen, onclose, onerror,
        on_string_message_receive, on_bytes_message_receive, before_message}) {
        super(host, protocols);

        this.ws.binaryType = binaryType;

        this.onopen = onopen;
        this.onclose = onclose;
        this.onerror = onerror;


        this.beforemessage = before_message || defaultMiddleWare;
        // this.aftermessage = after_message;
        let self = this;
        if (on_string_message_receive != null || on_bytes_message_receive != null) {
            this.on_string_message_receive = on_string_message_receive | function (msg) {
                if (self.on_bytes_message_receive) return self.on_bytes_message_receive(hexbytes.StringToBytes(msg));
                return false;
            };

            this.on_bytes_message_receive = on_bytes_message_receive | function (msg) {
                if (self.on_string_message_receive) return self.on_string_message_receive(hexbytes.BytesToString(msg));
                return false;
            };
        }
        this.ws.onmessage = this.onMessage;
        this.host = host;
    }

    /**
     * @description:
     * @author Myriad-Dreamin
     * @param event {MessageEvent}
     * @property event.data {string|ArrayBuffer}
     */
    onMessage(event) {

        event.data = this.beforemessage(event.data);

        if (typeof event.data === String) {
            window.console.log('Received data string');
            this.on_string_message_receive(event.data);
        }

        if (event.data instanceof ArrayBuffer) {
            window.console.log('Received arraybuffer');
            this.on_bytes_message_receive(event.data);
        }
        window.console.log('Received Message: ' + event.data);
    }
}

export default {
    WSClient,
};

export {WSClient};
