const express = require('express');
const router = express.Router();
const service = require('./users.service');

// routes
router.post('/authenticate', authenticate);
router.post('/register', register);
router.get('/', getCurrent);
router.put('/:id', update);

module.exports = router;

/**
 * @typedef UserLogin
 * @property {string} email.required
 * @property {string} password.required
 */
/**
 * @route POST /users/authenticate
 * @group users - Operations about user
 * @param {UserLogin.model} User.body.required - email, password for user login
 * @returns {object} 200 - An array of user info
 * @returns {object} 400 - default error
 */
function authenticate(req, res, next) {
    service.authenticate(req.body)
        .then(user => user ? res.json(user) : res.status(400).json({ message: 'Email or password is incorrect' }))
        .catch(err => next(err));
}

/**
 * @typedef UserRegistration
 * @property {string} email.required
 * @property {string} password.required
 * @property {string} name.required
 * @property {enum} language - Language values that need to be considered - eg: en,pl
 */
/**
 * @route POST /users/register
 * @group users - Operations about user
 * @param {UserRegistration.model} User.body.required - email, password, name and language for user registration
 * @returns {object} 200 - Empty response
 * @returns {object} 400 - default error
 */
function register(req, res, next) {
    service.create(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

/**
 * @route GET /users/
 * @group users - Operations about user
 * @returns {User.model} 200 - An array of user info
 * @returns {object} 404 - default error
 * @security JWT
 */
function getCurrent(req, res, next) {
    service.getById(req.user.sub)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
}

/**
 * @route PUT /users/
 * @group users - Operations about user
 * @param {string} email.query.required - email - eg: user@domain
 * @param {UserRegistration.model} User.body.required - email, password, name and language for user registration
 * @returns {object} 200 - empty response
 * @returns {object} 400 - default error
 * @security JWT
 */
function update(req, res, next) {
    service.update(req.params.email, req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}