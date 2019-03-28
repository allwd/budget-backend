const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * @typedef Account
 * @property {string} user.required
 * @property {string} title.required
 * @property {string} type.required
 * @property {Money.model} money.required
 */
const schema = new Schema({
    user: { type: String, required: true },
    title: { type: String, required: true },
    type: { type: String, required: true },
    money: require("../elements/element.model").model('Money').schema,
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Account', schema);