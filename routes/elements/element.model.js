const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const TYPES = ['income', 'expense', 'transfer']

/**
 * @typedef Money
 * @property {number} amount.required
 * @property {string} currency.required
 */
const moneySchema = new Schema({
    amount: { type: Number, required: true },
    currency: { type: String, required: true }
});

mongoose.model('Money', moneySchema);
/**
 * @typedef Element
 * @property {string} user.required
 * @property {string} account.required
 * @property {string[]} tags
 * @property {string} category
 * @property {string} createdDate.required
 * @property {string} image
 * @property {enum} type type for element - eg: income,expense,transfer
 * @property {Money.model} money.required
 */
const schema = new Schema({
    user: { type: String, required: true },
    account: { type: String, required: true },
    tags: [String],
    category: { type: String, required: false },
    createdDate: { type: String, default: Date.now },
    image: { type: String, required: false },
    type: { type: String, enum: TYPES, required: true },
    money: moneySchema,
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Element', schema)