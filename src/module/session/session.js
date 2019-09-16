
import hexbytes from '@module/util/hexbytes';

/*
type MultiThreadSerialSession struct {
	ID               int64  `json:"-" xorm:"pk unique notnull autoincr 'id'"`
	ISCAddress       []byte `json:"-" xorm:"notnull 'isc_address'"`
	TransactionCount uint32 `json:"-" xorm:"'transaction_count'"`
	UnderTransacting uint32 `json:"-" xorm:"'under_transacting'"`
	Status           uint8  `json:"-" xorm:"'status'"`
	Content          []byte `json:"-" xorm:"'content'"`

	// index
	Accounts     []uiptypes.Account `json:"-" xorm:"-"`
	Transactions [][]byte           `json:"transactions" xorm:"-"`

	// Acks     []byte `json:"-" xorm:"'-'"`
	// AckCount uint32 `json:"-" xorm:"'-'"`

	// handler
	Signer uiptypes.Signer `json:"-" xorm:"-"`
}*/

class Session {

    /**
     * @Description:
     * @author Myriad-Dreamin
     * @param id {number}
     * @param isc_address {string|Uint8Array}
     * @param transaction_account {number}
     * @param under_transacting {number}
     * @param status {number}
     * @param relate_host {string}
     */
    constructor(id, isc_address, transaction_account, under_transacting, status, relate_host) {
        this.id = id;
        this._isc_address = isc_address;
        this.transaction_account = transaction_account;
        this.under_transacting = under_transacting;
        this.status = status;
        this.relate_host = relate_host;
    }

    // get id() {
    //     return this._id;
    // }
    //
    // set id(value) {
    //     this._id = value;
    // }

    /**
     * @Description:
     * @author Myriad-Dreamin
     * @returns {Uint8Array}
     */
    get isc_address() {
        return this._isc_address;
    }

    /**
     * @Description:
     * @author Myriad-Dreamin
     * @returns {string}
     */
    show_isc_address() {
        return hexbytes.BytesToString(this._isc_address);
    }

    /**
     * @Description:
     * @author Myriad-Dreamin
     * @param value {string|Uint8Array}
     * @returns {Error}
     */
    set isc_address(value) {
        if (typeof value === 'string') {
            value = hexbytes.HexToBytes(value);
            if (value === null) {
                return Error('convert error');
            }
        }
        this._isc_address = value;
    }

    /**
     * @Description:
     * @author Myriad-Dreamin
     * @returns {string}
     */
    to_json() {
        return JSON.stringify({
            id: this.id,
            isc_address: this.show_isc_address(),
            transaction_account: this.transaction_account,
            under_transacting: this.under_transacting,
            status: this.status,
            relate_host: this.relate_host,
        });
    }

    /**
     * @Description:
     * @author Myriad-Dreamin
     * @returns {{relate_host: string, transaction_account: number, isc_address: string, under_transacting: number, id: number, status: number}}
     */
    to_object() {
        return {
            id: this.id,
            isc_address: this.show_isc_address(),
            transaction_account: this.transaction_account,
            under_transacting: this.under_transacting,
            status: this.status,
            relate_host: this.relate_host,
        };
    }


    // get transaction_account() {
    //     return this._transaction_account;
    // }
    //
    // set transaction_account(value) {
    //     this._transaction_account = value;
    // }
    //
    // get under_transacting() {
    //     return this._under_transacting;
    // }
    //
    // set under_transacting(value) {
    //     this._under_transacting = value;
    // }
    //
    // get relate_host() {
    //     return this._relate_host;
    // }
    //
    // set relate_host(value) {
    //     this._relate_host = value;
    // }
    //
    // get status() {
    //     return this._status;
    // }
    //
    // set status(value) {
    //     this._status = value;
    // }
    //
    //
}

Session.fromJSON = ({id, isc_address, transaction_account, under_transacting, status, relate_host}) => {
    return new Session(id, isc_address, transaction_account, under_transacting, status, relate_host);
};

export default {
    Session,
};

export {Session};




