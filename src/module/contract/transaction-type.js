
var TransactionType = {
    Validators: 1,

    SendTransaction: 2,

    SystemCall: 3,

    CreateContract: 4,
};


if (Object.freeze) {
    Object.freeze(TransactionType);
}

export default {
    TransactionType
};


export { TransactionType };
