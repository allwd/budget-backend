const db = require('../../helpers/db');
const Account = db.Account;

module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

async function getAll(userId) {
    return await Account.find({ user: userId }).select();
}

async function getById(userId, id) {
    return await Account.find({ user: userId, _id: id }).select();
}

async function create(userId, params) {
    const element = new Account(Object.assign({}, params, { user: userId }));

    return await element.save();
}

async function update(userId, id, params) {
    const element = await Account.find({ user: userId }).select();

    if (!element) throw 'Account not found';

    Object.assign(element, params);

    return await element.save();
}

async function _delete(userId, id) {
    return await Account.findOneAndDelete({ user: userId, _id: id });
}