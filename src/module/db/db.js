
import low from 'lowdb';
import FileSync from 'lowdb/adapters/FileSync';


const adapter = new FileSync('./db.json');
const db = low(adapter);
// Set some defaults (required if your JSON file is empty)

// db.defaults({ posts: [], user: {
//     status: {
//         strength: 1,
//     },
// }, count: 0 }).write();

window.globadb = db;

class SubDB {
    constructor(path) {
        this.path = path;
    }

    concat_path(key) {
        if (key) return this.path + '.' + key;
        return this.path;
    }

    dir_path() {
        if(!this.path) {
            return this.path;
        }
        return this.path.splice(this.path.lastIndexOf('.'), this.path.length);
    }

    apply(path) {
        return new SubDB(path?this.concat_path(path):this.path);
    }

    release() {
        return new SubDB(this.dir_path());
    }

    get(key) {
        return db.get(this.concat_path(key?this.concat_path(key):this.path));
    }

    set(value, key) {
        // window.console.log(this.concat_path(key), value);
        return db.set(key?this.concat_path(key):this.path, value);
    }

    unset(key) {
        return db.unset(key?this.concat_path(key):this.path);
    }

    update(handler, key) {
        return db.update(key?this.concat_path(key):this.path, handler);
    }

    has(key) {
        return db.has(key?this.concat_path(key):this.path);
    }
}

class KeyDB {
    constructor (local_db) {
        this.db = local_db;
        this.init();
    }
    init() {
        if(!this.db.has().value()) {
            this.db.set([]).write();
        }
    }

    get() {
        return this.db.get().value();
    }

    set(value) {
        return this.db.set(value).write();
    }

    update(accountList) {
        this.db.update((o)=>{
            o = o || [];
            for (let account of accountList) {
                let index = db._.findIndex(o, {chainID: account.chainID});
                if(index == -1) {
                    o.push(account);
                } else {
                    o[index] = account;
                }
            }
            return o;
        }).write();
        return null;
    }

}

class PubKeyDB {
    constructor (local_db) {
        this.db = local_db;
        this.init();
    }
    init() {
        if(!this.db.has().value()) {
            this.db.set([]).write();
        }
    }

    updateContact(addressList) {
        this.db.update((o)=>{
            o = o || [];
            for (let address of addressList) {
                let index = db._.findIndex(o, {address: address.address, chainID: address.chainID});
                if(index == -1) {
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
    constructor (local_db) {
        this.db = local_db.apply('user');
    }
    login(name) {
        this.db = this.db.apply(name);
        this.name = name;
        this.keys = new KeyDB(this.db.apply('keys'));
        this.contact = new PubKeyDB(this.db.apply('contact'));
    }
    logout() {
        this.db = this.db.release();
        this.name = undefined;
        this.keys = null;
        this.contact = null;
    }

    updateContact(addressList) {
        return this.contact.updateContact(addressList);
    }

    updateKeys(accountList) {
        return this.keys.update(accountList);
    }
}


var rt = new SubDB();
export default {
    origin: db,
    userdb: new UserDB(rt),
    infodb: rt.apply('info'),
    config: rt.apply('config'),
};
