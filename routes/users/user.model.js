const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * @typedef User
 * @property {string} email.required
 * @property {string} password.required
 * @property {string} name.required
 * @property {string} createdDate
 * @property {enum} language - Language values that need to be considered - eg: en,pl
 */
const schema = new Schema({
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    createdDate: { type: Date, default: Date.now },
    language: { type: String, default: 'en', enum: ['en', 'pl'] }
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('User', schema);