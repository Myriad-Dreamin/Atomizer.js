
import { fromKeyPair } from '@module/crypto/account';


import low from 'lowdb';
import FileSync from 'lowdb/adapters/FileSync';
// import {Session} from '@module/session/session';

const adapter = new FileSync('./db.json');
const db = low(adapter);
// Set some defaults (required if your JSON file is empty)

// db.defaults({ posts: [], user: {
//     status: {
//         strength: 1,
//     },
// }, count: 0 }).write();

class SubDB {
    /**
     * @Description:
     * @author Myriad-Dreamin
     * @param path { string }
     */
    constructor(path) {
        if(path)this.path = path;
        else this.path = '';
    }

    /**
     * @Description:
     * @author Myriad-Dreamin
     * @param key
     * @returns {string}
     */
    concat_path(key) {
        if (key) return this.path + '.' + key;
        return this.path;
    }

    /**
     * @Description:
     * @author Myriad-Dreamin
     * @returns {string}
     */
    dir_path() {
        if(!this.path) {
            return this.path;
        }
        return this.path.splice(this.path.lastIndexOf('.'), this.path.length);
    }

    /**
     * @Description:
     * @author Myriad-Dreamin
     * @param path {string}
     * @returns {SubDB}
     */
    apply(path) {
        return new SubDB(path?this.concat_path(path):this.path);
    }

    /**
     * @Description:
     * @author Myriad-Dreamin
     * @returns {SubDB}
     */
    release() {
        return new SubDB(this.dir_path());
    }

    /**
     * @Description:
     * @author Myriad-Dreamin
     * @param key {string}
     * @returns {*}
     */
    get(key) {
        return db.get(key?this.concat_path(key):this.path);
    }

    /**
     * @Description:
     * @author Myriad-Dreamin
     * @param value {*}
     * @param key {string}
     * @returns {*}
     */
    set(value, key) {
        // window.console.log(this.concat_path(key), value);
        return db.set(key?this.concat_path(key):this.path, value);
    }

    /**
     * @Description:
     * @author Myriad-Dreamin
     * @param key {string}
     * @returns {boolean}
     */
    unset(key) {
        return db.unset(key?this.concat_path(key):this.path);
    }

    /**
     * @Description:
     * @author Myriad-Dreamin
     * @param handler {function}
     * @param key {string}
     * @returns {*}
     */
    update(handler, key) {
        return db.update(key?this.concat_path(key):this.path, handler);
    }

    /**
     * @Description:
     * @author Myriad-Dreamin
     * @param key {string}
     * @returns {boolean}
     */
    has(key) {
        return db.has(key?this.concat_path(key):this.path);
    }
}

class KeyDB {
    /**
     * @Description:
     * @author Myriad-Dreamin
     * @param local_db { SubDB }
     */
    constructor (local_db) {
        this.db = local_db;
        this.init();
    }

    /**
     * @Description:
     * @author Myriad-Dreamin
     */
    init() {
        if(!this.db.has().value()) {
            this.db.set([]).write();
        }
    }

    /**
     * @Description:
     * @author Myriad-Dreamin
     * @returns {Array<Object,{alias, privateKey, publicKey, chainID}>}
     */
    get() {
        return this.db.get().value();
    }

    /**
     * @Description:
     * @author Myriad-Dreamin
     * @param value {Array<Object,{alias, privateKey, publicKey, chainID}>}
     * @returns {*}
     */
    set(value) {
        return this.db.set(value).write();
    }

    /**
     * @Description:
     * @author Myriad-Dreamin
     * @param accountList {Array<Object,{alias, privateKey, publicKey, chainID}>}
     * @returns { Error }
     */
    update(accountList) {
        this.db.update((o)=>{
            o = o || [];
            for (let account of accountList) {

                account.publicKey = fromKeyPair(account).public().hex();
                let index = db._.findIndex(o, {chainID: account.chainID});
                if(index === -1) {
                    o.push(account);
                } else {
                    o[index] = account;
                }
            }
            return o;
        }).write();
        return null;
    }

    /**
     * @Description:
     * @author Myriad-Dreamin
     * @param condition {Array|Object} collection The collection to inspect.
     * @param condition {Function} [predicate=_.identity] The function invoked per iteration.
     * @param condition {number} [fromIndex=0] The index to search from.
     * @returns {*} Returns the matched element, else `undefined`.
     */
    find(condition) {
        return this.db.get().find(condition).value();
    }
}

class PubKeyDB {
    /**
     * @Description:
     * @author Myriad-Dreamin
     * @param local_db { SubDB }
     */
    constructor (local_db) {
        this.db = local_db;
        this.init();
    }

    /**
     * @Description:
     * @author Myriad-Dreamin
    */
    init() {
        if(!this.db.has().value()) {
            this.db.set([]).write();
        }
    }

    /**
     * @Description:
     * @author Myriad-Dreamin
     * @returns {Array<Object,{address, chainID}>}
     */
    get() {
        return this.db.get().value();
    }

    /**
     * @Description:
     * @author Myriad-Dreamin
     * @param value {Array<Object,{address, chainID}>}
     * @returns {*}
     */
    set(value) {
        return this.db.set(value).write();
    }

    /**
     * @Description:
     * @author Myriad-Dreamin
     * @param addressList {Array<Object,{address, chainID}>}
     * @returns { Error }
     */
    updateContact(addressList) {
        this.db.update((o)=>{
            o = o || [];
            for (let address of addressList) {
                let index = db._.findIndex(o, {address: address.address, chainID: address.chainID});
                if(index === -1) {
                    o.push(address);
                } else {
                    o[index] = address;
                }
            }
            return o;
        }).write();
        return null;
    }
}

class UserDB {
    /**
     * @Description:
     * @author Myriad-Dreamin
     * @param local_db { SubDB }
     */
    constructor (local_db) {
        this.db = local_db;
    }

    /**
     * @Description:
     * @author Myriad-Dreamin
     * @param name { String }
     */
    login(name) {
        this.db = this.db.apply(name);
        this.name = name;
        this.keys = new KeyDB(this.db.apply('keys'));
        this.contact = new PubKeyDB(this.db.apply('contact'));
    }

    /**
     * @Description:
     * @author Myriad-Dreamin
    */
    logout() {
        this.db = this.db.release();
        this.name = undefined;
        this.keys = null;
        this.contact = null;
    }

    /**
     * @Description:
     * @author Myriad-Dreamin
     * @param addressList {Array<Object,{address, chainID}>}
     * @returns {Error}
     */
    updateContact(addressList) {
        return this.contact.updateContact(addressList);
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
        return this.keys.update(accountList);
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
        return this.keys.get();
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
        return this.keys.find(condition);
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
        return this.keys.find({alias});
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
        return this.keys.find({chainID});
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
        return this.keys.find({publicKey});
    }

    /**
     * @Description:
     * @author Myriad-Dreamin
     * @param condition {Object} object The object to query.
     * @param condition {Array|string} path The path to check.
     * @returns {boolean} Returns `true` if `path` exists, else `false`.
     */
    hasKey(condition) {
        return this.keys.get().has(condition).value();
    }

    /**
     * @Description:
     * @author Myriad-Dreamin
     * @returns {Array<Object, {address, chainID}>}
     */
    listContacts() {
        return this.contact.get();
    }
}

class SessionDB {
    /**
     * @Description:
     * @author Myriad-Dreamin
     * @param local_db { SubDB }
     */
    constructor (local_db) {
        this.db = local_db;
    }

    /**
     * @Description:
     * @author Myriad-Dreamin
     * @param session {Session}
     */
    push(session) {
        this.db.update((o)=>{
            o = o || [];
            let obj = session.to_object();
            let index = db._.findIndex(o, {isc_address: obj.isc_address});
            if(index === -1) {
                o.push(obj);
            } else {
                o[index] = obj;
            }
            return o;
        }).write();
        return null;
    }

    /**
     * @Description:
     * @author Myriad-Dreamin
     * @param condition {Array|Object} collection The collection to inspect.
     * @param condition {Function} [predicate=_.identity] The function invoked per iteration.
     * @param condition {number} [fromIndex=0] The index to search from.
     * @returns {*} Returns the matched element, else `undefined`.
     */
    find(condition) {
        return this.db.get().find(condition).value();
    }

    serve() {
    }
}


export default {
    origin: db,
    userdb: new UserDB(new SubDB('user')),
    sessiondb: new SessionDB(new SubDB('session')),
    infodb: new SubDB('info'),
    config: new SubDB('config'),
};
