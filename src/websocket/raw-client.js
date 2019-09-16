
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

import hexbytes from "@module/util/hexbytes";

/**
 * @Description:
 * @author Myriad-Dreamin
 * @callback on_string_message_receive
 * @param {string} msg
 * @callback on_bytes_message_receive
 * @param {ArrayBuffer} msg
 */

class WSClient {

    /**
     * @Description:
     * @author Myriad-Dreamin
     * @param host {string}
     * @param protocols {string|string[]}
     * @param onopen {Function<Event>}
     * @param onclose {Function<CloseEvent>}
     *
     * @param on_string_message_receive {on_string_message_receive}
     * @param on_bytes_message_receive {on_bytes_message_receive}
     */
    constructor(host, {protocols, onopen, onclose, on_string_message_receive, on_bytes_message_receive}) {
        this.onopen = onopen;
        this.onclose = onclose;
        let self = this;

        if (on_string_message_receive != null || on_bytes_message_receive != null) {
            this.on_string_message_receive = on_string_message_receive | function (msg) {
                if (self.on_bytes_message_receive) self.on_bytes_message_receive(hexbytes.StringToBytes(msg));
            };

            this.on_bytes_message_receive = on_bytes_message_receive | function (msg) {
                if (self.on_string_message_receive) self.on_string_message_receive(hexbytes.BytesToString(msg));
            };
        }

        this.direct(host, {protocols});
    }

    /**
     * @Description:
     * @author Myriad-Dreamin
     * @param host {string}
     * @param protocols {string|string[]}
     */
    direct(host, {protocols}) {
        this.host = host;
        this.build(host, {protocols});
    }

    /**
     * @Description:
     * @author Myriad-Dreamin
     * @param host {string}
     * @param protocols {string|string[]}
     */
    build(host, {protocols}) {
        this.ws = new WebSocket(host, protocols);
        // ws.onopen
    }

    /**
     * @Description:
     * @author Myriad-Dreamin
     * @param event {MessageEvent}
     * @property event.data {string|ArrayBuffer}
     */
    onmessage(event) {
        if (typeof event.data === String) {
            console.log("Received data string");
            this.on_string_message_receive(event.data);
        }

        if (event.data instanceof ArrayBuffer) {
            this.on_bytes_message_receive(event.data);
            console.log("Received arraybuffer");
        }
        console.log("Received Message: " + event.data);
    }




}