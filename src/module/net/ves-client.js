
import Methods from './ves-client-method';


class ElectronClient {
    /**
     * @Description:
     * @author Myriad-Dreamin
     * @param db { UserDB }
     * @param name {string}
     */
    constructor(db, {name}) {
        this.db = db;
        this.name = name;
    }

    /**
     * @Description:
     * @author Myriad-Dreamin
     * @return {Error}
     */
    sayHello() {
        return null
    }

    sendKeys() {

    }

    startSession() {

    }

    /**
     * @Description:
     * @author Myriad-Dreamin
     * @param name {string}
     * @return {Error}
     */
    setName(name) {
        if(this.name !== name) {
            this.name = name;
            return this.sayHello();
        }
    }

    /**
     * @Description:
     * @author Myriad-Dreamin
     * @param message {string}
     * @param dst {string}
     */
    sendMessage(message, dst) {

    }





}


export default Object.assign({ ElectronClient }, Methods);