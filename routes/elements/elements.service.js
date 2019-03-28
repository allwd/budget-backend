const db = require('../../helpers/db');
const Element = db.Element;
const Account = db.Account;

module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

async function getAll(userId) {
    return await Element.find({ user: userId }).select();
}

async function getById(userId, id) {
    return await Element.find({ user: userId, _id: id }).select();
}

async function create(userId, params) { // upload image to service or convert or sth
    const element = new Element(Object.assign({}, params, { user: userId }));

    const account = await Account.find({ _id: params['account'] }).select();

    if (account) {
        account.money = Object.assign(account.money, {
            amount: account.money.amount + (params['type'] === 'income' ? 1 : -1) * params['money']['amount']
        });

        await account.save();
    }

    return await element.save();
}

async function update(userId, id, params) {
    const element = await Element.find({ user: userId, _id: id }).select();

    if (!element) throw 'Element not found';

    Object.assign(element, params);

    return await element.save();
}

async function _delete(userId, id) {
    return await Element.findOneAndDelete({ user: userId, _id: id });
}