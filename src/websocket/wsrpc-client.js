import {WSClient} from '@/websocket/raw-client';
import {proto} from '@net-grpc/lib/proto';

// import {proto} from '@net-grpc/lib/proto';

import {BinaryEncoder} from '@third-party/binary-encoder/binary-encoder';
import hexbytes from '@module/util/hexbytes';
import {BinaryDecoder} from '@third-party/binary-decoder/binary-decoder';
import {logger} from '@module/global';

const do_nothing = (() => {});

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

class WSRPCUnserializer {
    constructor() {

    }

    /**
     *
     * @param raw {Uint8Array}
     * @return {string}
     */
    decodeIP(raw) {
        let qwq = BinaryDecoder.alloc(raw);
        let a = qwq.readUint16();
        if (qwq.getError()) {
            qwq.free();
            return ;
        }

        let b = qwq.readUint16();
        if (qwq.getError()) {
            qwq.free();
            return ;
        }

        let c = qwq.readUint16();
        if (qwq.getError()) {
            qwq.free();
            return ;
        }

        let d = qwq.readUint16();
        if (qwq.getError()) {
            qwq.free();
            return ;
        }

        return a + '.' + b + '.' + c + '.' + d;
    }
}
const defaultWSRPCUnserializer = new WSRPCUnserializer();

class WSRPCClient {
    /**
     * @description
     * @author Myriad-Dreamin
     * @param host {string}
     * @param name {string}
     * @param serializer {WSRPCSerializer}
     * @param unserializer {WSRPCUnserializer}
     * @param on_message_reply {Function}
     * @param on_optional_ves_host {Function}
     * @param on_optional_nsb_host {Function}
     * @param on_optional_ves_host {Function}
     * @param options {{onopen,onclose,onerror,on_string_message_receive,on_bytes_message_receive,before_message}}
     * @param options.binaryType {string}
     * @param options.onopen {Function<Event>}
     * @param options.onclose {Function<CloseEvent>}
     * @param options.onerror {Function<Event>}
     * @param options.on_string_message_receive {on_string_message_receive}
     * @param options.on_bytes_message_receive {on_bytes_message_receive}
     * @param options.before_message {PreMessageMiddleWare}
     */
    constructor(host, name, {serializer,
        unserializer,
        on_message_reply, on_optional_ves_host, on_optional_nsb_host,
        options}) {

        this.serializer = serializer || defaultWSRPCSerializer;
        this.unserializer = unserializer || defaultWSRPCUnserializer;
        this.on_message_reply = on_message_reply || do_nothing;
        this.on_optional_ves_host = on_optional_ves_host || do_nothing;
        this.on_optional_nsb_host = on_optional_nsb_host || do_nothing;

        options.binaryType = options.binaryType || 'arraybuffer';

        let self = this;
        let smr = options.on_string_message_receive;
        if (smr) {
            options.on_string_message_receive = function (msg) {
                if (smr(msg)) return true;
                return self.processMessage(hexbytes.StringToBytes(msg));
            };
        } else {
            options.on_string_message_receive = function (msg) {
                return self.processMessage(hexbytes.StringToBytes(msg));
            };
        }

        let bmr = options.on_bytes_message_receive;
        if (bmr) {
            options.on_bytes_message_receive = function (msg) {
                if (bmr(msg)) return true;
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

    /**
     * @Description:
     * @author Myriad-Dreamin
     * @param acc {proto.uiprpc.base.Account}
     * @returns {ArrayBufferLike|undefined}
     */
    userRegister(acc) {
        let message = new proto.wsrpc.UserRegisterRequest();
        message.setAccount(acc);
        message.setUserName(this.name);
        return this.postMessage(proto.wsrpc.MessageID.CodeUserRegisterRequest, message);
    }

    // resetName(name) {
    //     this.name = name;
    // }

    /**
     * @Description:
     * @author Myriad-Dreamin
     * @param msg {ArrayBuffer}
     * @returns {boolean}
     */
    processMessage(msg) {
        logger.info(msg);
        /**
         * @Description: msg reader
         * @type {!jspb.BinaryDecoder}
         */
        let reader = BinaryDecoder.alloc(msg);
        let msgid = reader.readUint16();
        let err = undefined;
        switch (msgid) {
        case proto.wsrpc.MessageID.CodeMessageReply:
            err = this.processMessageReply(reader);
            break;
        case proto.wsrpc.MessageID.CodeAttestationSendingRequest:
            err = this.processAttestationSendingRequest(reader);
            break;
        case proto.wsrpc.MessageID.CodeAttestationReceiveRequest:
            err = this.processAttestationReceiveRequest(reader);
            break;
        case proto.wsrpc.MessageID.CodeRequestComingRequest:
            err = this.processRequestComingRequest(reader);
            break;
        case proto.wsrpc.MessageID.CodeClientHelloReply:
            err = this.processClientHelloReply(reader);
            break;
        case proto.wsrpc.MessageID.CodeUserRegisterReply:
            err = this.processUserRegisterReply(reader);
            break;
        case proto.wsrpc.MessageID.CodeCloseSessionRequest:
            err = this.processCloseSessionRequest(reader);
            break;
        default:
            msgid = 0xffff;
        }
        reader.free();
        if (msgid === 0xffff) {
            logger.debug('not corresponding method');
            return false;
        } else {
            if(err) logger.debug(err);
            return true;
        }
    }

    /**
     * @Description:
     * @author Myriad-Dreamin
     * @param reader {BinaryDecoder}
     * @returns {Error}
     */
    processMessageReply(reader) {
        logger.debug(reader);
        let messageReply = proto.wsrpc.Message.deserializeBinary(reader.bytes());

        // if messageReply === null, then it failed as well (name !== null)
        if (messageReply.getTo() === this.name) {
            this.on_message_reply(messageReply);
        }
        return null;
    }

    /**
     * @Description:
     * @author Myriad-Dreamin
     * @param reader {BinaryDecoder}
     * @returns {Error}
     */
    processClientHelloReply(reader) {
        logger.debug(reader);
        let clientHelloReply = proto.wsrpc.ClientHelloReply.deserializeBinary(reader.bytes());
        let ves_host = clientHelloReply.getGrpcHost();
        if (ves_host) {
            ves_host = this.unserializer.decodeIP(ves_host);
            if (ves_host) this.on_optional_ves_host(ves_host);
            else {
                logger.debug('decode ves host failed');
            }
        }

        let nsb_host = clientHelloReply.getNsbHost();
        if (nsb_host) {
            nsb_host = this.unserializer.decodeIP(nsb_host);
            if (nsb_host) this.on_optional_nsb_host(nsb_host);
            else {
                logger.debug('decode ves host failed');
            }
        }

        return null;
    }

    /**
     * @Description:
     * @author Myriad-Dreamin
     * @param reader {BinaryDecoder}
     * @returns {Error}
     */
    processRequestComingRequest(reader) {
        logger.debug(reader);
        let requestComingRequest = proto.wsrpc.RequestComingRequest.deserializeBinary(reader.bytes());
        logger.info(
            'new session request comming:',
            'session id:', hexbytes.BytesToHex(requestComingRequest.getSessionId()),
            'resposible address:', hexbytes.BytesToHex(requestComingRequest.getAccount().getAddress()),
        );


        /**
         *


         signer, err := vc.getNSBSigner()
         if err != nil {
				log.Errorln("VesClient.read.RequestComingRequest.getNSBSigner:", err)
				continue
			}

         hs, err := helper.DecodeIP(requestComingRequest.GetNsbHost())
         if err != nil {
				log.Errorln("VesClient.read.RequestComingRequest.DecodeIP:", err)
				continue
			}

         fmt.Println("send ack to nsb", hs)

         // todo: new nsbclient
         if ret, err := nsbcli.NewNSBClient(hs).UserAck(
         signer,
         requestComingRequest.GetSessionId(),
         requestComingRequest.GetAccount().GetAddress(),
         // todo: signature
         []byte("123"),
         ); err != nil {
				log.Errorln("VesClient.read.RequestComingRequest.UserAck:", err)
				continue
			} else {
				fmt.Printf(
					"user ack {\n\tinfo: %v,\n\tdata: %v,\n\tlog: %v, \n\ttags: %v\n}\n",
					ret.Info, string(ret.Data), ret.Log, ret.Tags,
				)
			}

         if err = vc.sendAck(
         requestComingRequest.GetAccount(),
         requestComingRequest.GetSessionId(),
         requestComingRequest.GetGrpcHost(),
         signer.Sign(requestComingRequest.GetSessionId()).Bytes(),
         ); err != nil {
				log.Errorln("VesClient.read.RequestComingRequest.sendAck:", err)
				continue
			}
         */
        return undefined;
    }


    /**
     * @Description:
     * @author Myriad-Dreamin
     * @param reader {BinaryDecoder}
     * @returns {Error}
     */
    processAttestationSendingRequest(reader) {
        logger.debug(reader);
        /**
         // attestation sending request has the same format with request
         // coming request
         var attestationSendingRequest = vc.getrequestComingRequest()
         err = proto.Unmarshal(buf.Bytes(), attestationSendingRequest)
         if err != nil {
				log.Errorln("VesClient.read.AttestationSendingRequest.proto:", err)
				continue
			}

         fmt.Println(
         "new transaction's attestation must be created",
         hex.EncodeToString(attestationSendingRequest.GetSessionId()),
         hex.EncodeToString(attestationSendingRequest.GetAccount().GetAddress()),
         )

         raw, tid, src, dst, err := vc.getRawTransaction(
         attestationSendingRequest.GetSessionId(),
         attestationSendingRequest.GetGrpcHost(),
         )
         if err != nil {
				log.Errorln("VesClient.read.AttestationSendingRequest.getRawTransaction:", err)
				continue
			}

         fmt.Printf(
         "the instance of the %vth transaction intent is: %v\n", tid,
         string(raw),
         )

         signer, err := vc.getNSBSigner()
         if err != nil {
				log.Errorln("VesClient.read.AttestationSendingRequest.getNSBSigner:", err)
				continue
			}

         hs, err := helper.DecodeIP(attestationSendingRequest.GetNsbHost())
         if err != nil {
				log.Errorln("VesClient.read.AttestationSendingRequest.DecodeIP:", err)
				continue
			}

         // packet attestation
         var sendingAtte = vc.getReceiveAttestationReceiveRequest()
         sendingAtte.SessionId = attestationSendingRequest.GetSessionId()
         sendingAtte.GrpcHost = attestationSendingRequest.GetGrpcHost()

         sigg := signer.Sign(raw)
         sendingAtte.Atte = &uipbase.Attestation{
				Tid:     tid,
				Aid:     TxState.Instantiating,
				Content: raw,
				Signatures: append(make([]*uipbase.Signature, 0, 1), &uipbase.Signature{
					// todo use src.signer to sign
					SignatureType: sigg.GetSignatureType(),
					Content:       sigg.GetContent(),
				}),
			}
         sendingAtte.Src = src
         sendingAtte.Dst = dst

         fmt.Println("send ack to nsb", hs)
         if ret, err := nsbcli.NewNSBClient(hs).InsuranceClaim(
         signer,
         sendingAtte.SessionId,
         sendingAtte.Atte.Tid,
         TxState.Instantiating,
         ); err != nil {
				log.Errorln("VesClient.read.AttestationSendingRequest.InsuranceClaim:", err)
				continue
			} else {
				fmt.Printf(
					formatInsuranceClaim,
					"instantiating", ret.Info, string(ret.Data), ret.Log, ret.Tags,
				)
			}

         err = vc.postRawMessage(wsrpc.CodeAttestationReceiveRequest, dst, sendingAtte)
         if err != nil {
				log.Errorln("VesClient.read.AttestationSendingRequest.postRawMessage:", err)
				continue
			}

         */
        return undefined;
    }


    /**
     * @Description:
     * @author Myriad-Dreamin
     * @param reader {BinaryDecoder}
     * @returns {Error}
     */
    processUserRegisterReply(reader) {
        logger.debug(reader);
        /**

         // todo: ignoring
         vc.cb <- buf
         */
        return undefined;
    }


    /**
     * @Description:
     * @author Myriad-Dreamin
     * @param reader {BinaryDecoder}
     * @returns {Error}
     */
    processAttestationReceiveRequest(reader) {
        logger.debug(reader);
        /**

         var s = vc.getReceiveAttestationReceiveRequest()

         err = proto.Unmarshal(buf.Bytes(), s)
         if err != nil {
				log.Errorln("VesClient.read.AttestationReceiveRequest.proto:", err)
				continue
			}

         atte := s.GetAtte()
         aid := atte.GetAid()

         switch aid {
			case TxState.Unknown:
				log.Infoln("transaction is of the status unknown")
			case TxState.Initing:
				log.Infoln("transaction is of the status initing")
			case TxState.Inited:
				log.Infoln("transaction is of the status inited")
			case TxState.Closed:
				// skip closed atte (last)
				log.Infoln("skip the last attestation of this transaction")
			default:
				log.Infoln("must send attestation with status:", TxState.Description(aid+1))

				signer, err := vc.getNSBSigner()
				if err != nil {
					log.Errorln("VesClient.read.AttestationReceiveRequest.getNSBSigner:", err)
					continue
				}

				sigs := atte.GetSignatures()
				toSig := sigs[len(sigs)-1].GetContent()

				var sendingAtte = vc.getSendAttestationReceiveRequest()
				sendingAtte.SessionId = s.GetSessionId()
				sendingAtte.GrpcHost = s.GetGrpcHost()

				// todo: iter the atte (copy or refer it? )
				sigg := signer.Sign(toSig)
				sendingAtte.Atte = &uipbase.Attestation{
					Tid: atte.GetTid(),
					// todo: get nx -> more readable
					Aid:     aid + 1,
					Content: atte.GetContent(),
					Signatures: append(sigs, &uipbase.Signature{
						// todo signature
						SignatureType: sigg.GetSignatureType(),
						Content:       sigg.GetContent(),
					}),
				}
				sendingAtte.Src = s.GetDst()
				sendingAtte.Dst = s.GetSrc()

				if aid == TxState.Instantiated {
					acc := s.GetDst()

					log.Infoln("the resp is", hex.EncodeToString(acc.GetAddress()), acc.GetChainId())

					router := vc.getRouter(acc.ChainId)
					if router == nil {
						log.Errorln("VesClient.read.AttestationReceiveRequest.getRouter:", errors.New("get router failed"))
						continue
					}

					if router.MustWithSigner() {
						respSigner, err := vc.getRespSigner(s.GetDst())
						if err != nil {
							log.Errorln("VesClient.read.AttestationReceiveRequest.getRespSigner:", err)
							continue
						}

						router = router.RouteWithSigner(respSigner)
					}

					receipt, err := router.RouteRawTransaction(acc.ChainId, atte.GetContent())
					if err != nil {
						log.Errorln("VesClient.read.AttestationReceiveRequest.router.RouteRaw:", err)
						continue
					}
					fmt.Println("receipt:", hex.EncodeToString(receipt), string(receipt))

					bid, additional, err := router.WaitForTransact(acc.ChainId, receipt, vc.waitOpt)
					if err != nil {
						log.Errorln("VesClient.read.AttestationReceiveRequest.router.WaitForTransact:", err)
						continue
					}
					fmt.Println("route result:", bid)

					blockStorage := vc.getBlockStorage(acc.ChainId)
					if blockStorage == nil {
						log.Errorln("VesClient.read.AttestationReceiveRequest.getBlockStorage:", errors.New("get BlockStorage failed"))
						continue
					}

					proof, err := blockStorage.GetTransactionProof(acc.GetChainId(), bid, additional)
					if err != nil {
						log.Errorln("VesClient.read.AttestationReceiveRequest.blockStorage.GetTransactionProof:", err)
						continue
					}

					cb, err := vc.nsbClient.AddMerkleProof(signer, nil, proof.GetType(), proof.GetRootHash(), proof.GetProof(), proof.GetKey(), proof.GetValue())
					if err != nil {
						log.Errorln("VesClient.read.AttestationReceiveRequest.nsbClient.AddMerkleProof:", err)
						continue
					}
					fmt.Println("adding merkle proof", cb)

					// todo: add const TransactionsRoot
					cb, err = vc.nsbClient.AddBlockCheck(signer, nil, acc.ChainId, bid, proof.GetRootHash(), 1)
					if err != nil {
						log.Errorln("VesClient.read.AttestationReceiveRequest.nsbClient.AddBlockCheck:", err)
						continue
					}
					fmt.Println("adding block check", cb)
				}

				// sendingAtte.GetAtte()
				ret, err := vc.nsbClient.InsuranceClaim(
					signer,
					s.GetSessionId(),
					atte.GetTid(), aid+1,
				)
				//sessionID, tid, Instantiated)
				if err != nil {
					log.Errorln("VesClient.read.AttestationReceiveRequest.InsuranceClaim:", err)
					continue
				}

				fmt.Printf(
					"insurance claiming %v, %v {\n\tinfo: %v,\n\tdata: %v,\n\tlog: %v, \n\ttags: %v\n}\n",
					atte.GetTid(), TxState.Description(aid+1), ret.Info, string(ret.Data), ret.Log, ret.Tags,
				)

				err = vc.postRawMessage(wsrpc.CodeAttestationReceiveRequest, s.GetSrc(), sendingAtte)
				if err != nil {
					log.Errorln("VesClient.read.AttestationReceiveRequest.postRawMessage:", err)
					continue
				}

				grpcHost, err := helper.DecodeIP(s.GetGrpcHost())
				if err != nil {
					log.Println(err)
					return
				}

				vc.informAttestation(grpcHost, sendingAtte)
			}

         */
        return undefined;
    }


    /**
     * @Description:
     * @author Myriad-Dreamin
     * @param reader {BinaryDecoder}
     * @returns {Error}
     */
    processCloseSessionRequest(reader) {
        logger.debug(reader);
        /**
         *
         vc.cb <- buf
         log.Infoln("session closed")
         // case wsrpc.Code
         */
        return undefined;
    }

}

export default {
    WSRPCClient,
};

export {WSRPCClient};
