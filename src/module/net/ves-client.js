
import Methods from './ves-client-method';
import {WSRPCClient} from '@/websocket/wsrpc-client';

import {Account} from '@module/grpc-uip/account';

const VESRPCClient = Methods.Client;


class VESClient {
    /**
     * @Description:
     * @author Myriad-Dreamin
     * @param db { Object, {userdb} }
     * @param userdb { UserDB }
     * @param central_ves_host {string}
     * @param name {string}
     * @param ves_host {string}
     * @param wsoption {Object}
     */
    constructor(db, central_ves_host, name, {ves_host, wsoption}) {
        this.db = db;
        this.name = name;
        this.ws = new WSRPCClient(central_ves_host, name, wsoption);
        this.vs = new VESRPCClient(ves_host);
    }

    /**
     * @Description:
     * @author Myriad-Dreamin
     * @return {Error}
     */
    sayHello() {
        return null;
    }

    /**
     * @description
     * @author Myriad-Dreamin
     * @param dst {proto.uiprpc.base.Account}
     * @param msg {string|Uint8Array}
     * @returns {Error}
     */
    sendMessage(dst, msg) {
        if (typeof msg === 'function') {
            return Error('cant marshal function to string');
        }

        if (msg instanceof Object) {
            msg = JSON.stringify(msg);
        }

        return this.ws.sendMessage(dst, msg);
    }

    /**
     * @description
     * @author Myriad-Dreamin
     * @param alias {string}
     * @returns {Error}
     */
    sendKeys(alias) {
        // this.db.userdb.updateKeys()
        let obj = this.db.userdb.findAlias(alias);
        if (obj === null) {
            return Error('not found');
        }

        if (obj instanceof Array) {
            if (obj.length > 1) {
                return Error('ambiguous alias');
            }
            if (obj.length === 0) {
                return Error('not found');
            }
            obj = obj[0];
        }

        return this.ws.userRegister(new Account(obj.chainID, obj.publicKey));
    }

    /**
     * @description
     * @author Myriad-Dreamin
     * @param opintents {proto.uiprpc.base.OpIntents}
     * @param options {{host, credentials, options}}
     */
    sendOpIntents(opintents, options) {
        /**
         * @type {Client}
         */
        let client = undefined;
        if (options) {
            client = this.vs.split(options);
        } else {
            client = this.vs;
        }

        return client.session_start(opintents);
    }

    // /**
    //  * @Description:
    //  * @author Myriad-Dreamin
    //  * @param name {string}
    //  * @return {Error}
    //  */
    // setName(name) {
    //     if(this.name !== name) {
    //         this.name = name;
    //         return this.sayHello();
    //     }
    // }


    /**
     * @Description:
     * @author Myriad-Dreamin
     * @param name { String }
     */
    login(name) {
        return this.db.userdb.login(name);
    }

    /**
     * @Description:
     * @author Myriad-Dreamin
     */
    logout() {
        return this.db.userdb.logout();
    }

    /**
     * @Description:
     * @author Myriad-Dreamin
     * @param addressList {Array<Object,{address, chainID}>}
     * @returns {Error}
     */
    updateContact(addressList) {
        return this.db.userdb.updateContact(addressList);
    }

    /**
     * @Description:
     * @author Myriad-Dreamin
     * @param accountList {Array<Object,{alias, privateKey, publicKey, chainID}>}
     * @param accountList[].alias {string}
     * @param accountList[].privateKey {string}
     * @param accountList[].publicKey {string}
     * @param accountList[].chainID {number}
     * @returns {Error}
     */
    updateKeys(accountList) {
        return this.db.userdb.updateKeys(accountList);
    }

    /**
     * @Description:
     * @author Myriad-Dreamin
     * @returns {Array<Object, {alias, privateKey, publicKey, chainID}>}
     * @returns alias {string}
     * @returns privateKey {string}
     * @returns publicKey {string}
     * @returns chainID {number}
     */
    listKeys() {
        return this.db.userdb.listKeys();
    }

    /**
     * @Description:
     * @author Myriad-Dreamin
     * @param condition {Array|Object} collection The collection to inspect.
     * @param condition {Function} [predicate=_.identity] The function invoked per iteration.
     * @param condition {number} [fromIndex=0] The index to search from.
     * @returns {Array<Object,{alias, privateKey, publicKey, chainID}>} Returns the matched element, else `undefined`.
     * @returns alias {string}
     * @returns privateKey {string}
     * @returns publicKey {string}
     * @returns chainID {number}
     */
    findKey(condition) {
        return this.db.userdb.findKey(condition);
    }

    /**
     * @Description:
     * @author Myriad-Dreamin
     * @param alias {string}
     * @returns alias {string}
     * @returns privateKey {string}
     * @returns publicKey {string}
     * @returns chainID {number}
     * @returns {Object,{alias, privateKey, publicKey, chainID}} Returns the matched element, else `undefined`.
     */
    findAlias(alias) {
        return this.db.userdb.findAlias(alias);
    }

    /**
     * @Description:
     * @author Myriad-Dreamin
     * @param chainID {number}
     * @returns alias {string}
     * @returns privateKey {string}
     * @returns publicKey {string}
     * @returns chainID {number}
     * @returns {Object,{alias, privateKey, publicKey, chainID}} Returns the matched element, else `undefined`.
     */
    findChainID(chainID) {
        return this.db.userdb.findChainID(chainID);
    }

    /**
     * @Description:
     * @author Myriad-Dreamin
     * @param publicKey {string}
     * @returns alias {string}
     * @returns privateKey {string}
     * @returns publicKey {string}
     * @returns chainID {number}
     * @returns {Object,{alias, privateKey, publicKey, chainID}} Returns the matched element, else `undefined`.
     */
    findpublicKey(publicKey) {
        return this.db.userdb.findpublicKey(publicKey);
    }

    /**
     * @Description:
     * @author Myriad-Dreamin
     * @param condition {Object} object The object to query.
     * @param condition {Array|string} path The path to check.
     * @returns {boolean} Returns `true` if `path` exists, else `false`.
     */
    hasKey(condition) {
        return this.db.userdb.hasKey(condition);
    }

    /**
     * @Description:
     * @author Myriad-Dreamin
     * @returns {Array<Object, {address, chainID}>}
     */
    listContacts() {
        return this.db.userdb.listContacts();
    }


}


export default Object.assign({VESClient}, Methods);