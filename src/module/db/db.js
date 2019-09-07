
import low from 'lowdb';
import FileSync from 'lowdb/adapters/FileSync';


const adapter = new FileSync('./db.json');
const db = low(adapter);
// Set some defaults (required if your JSON file is empty)

db.defaults({ posts: [], user: {
    status: {
        strength: 1,
    },
}, count: 0 }).write();

window.globadb = db;

class SubDB {
    constructor(path) {
        this.path = path;
    }

    concat_path(key) {
        return this.path + '.' + key;
    }

    apply(path) {
        return new SubDB(this.concat_path(path));
    }

    get(key) {
        return db.get(this.concat_path(key));
    }

    set(key) {
        return db.set(this.concat_path(key));
    }

    unset(key) {
        return db.unset(this.concat_path(key));
    }

    update(key, handler) {
        return db.update(this.concat_path(key), handler);
    }

    has(key) {
        return db.has(this.concat_path(key));
    }
}

class KeyDB {
    constructor (local_db) {
        this.db = local_db;
    }
}

class UserDB {
    constructor (local_db) {
        this.db = local_db;
        this.eth = new KeyDB(this.db.apply('keys.eth'));
        this.tem = new KeyDB(this.db.apply('keys.tem'));
    }

}

export default {
    origin: db,
    userdb: new UserDB(SubDB('user')),
    infodb: new SubDB('info'),
    config: new SubDB('config'),
};
