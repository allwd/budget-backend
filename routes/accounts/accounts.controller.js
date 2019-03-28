const express = require('express');
const router = express.Router();
const service = require('./accounts.service');

// routes
router.get('/', getAll);
router.post('/', create);
router.get('/:id', getById);
router.put('/:id', update);
router.delete('/:id', _delete);

module.exports = router;

/**
 * @route GET /accounts/
 * @group accounts - Operations about accounts
 * @returns {Account[]} 200 - Array of accounts
 * @returns {object} 400 - default error
 * @security JWT
 */
function getAll(req, res, next) {
    service.getAll(req.user.sub)
        .then(element => element ? res.json(element) : res.json([]))
        .catch(err => next(err));
}

/**
 * @typedef NewAccount
 * @property {string} title.required
 * @property {string} type.required
 * @property {Money.model} money.required
 */
/**
 * @route POST /accounts/
 * @group accounts - Operations about accounts
 * @param {NewAccount.model} NewAccount.body.required - data for element creation
 * @returns {object} 200 - empty response
 * @returns {object} 400 - default error
 * @security JWT
 */
function create(req, res, next) {
    service.create(req.user.sub, req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

/**
 * @route GET /accounts/{id}
 * @group accounts - Operations about accounts
 * @param {string} id.path.required - id of the element to be fetched
 * @returns {Account.model} 200 - element
 * @returns {object} 400 - default error
 * @security JWT
 */
function getById(req, res, next) {
    service.getById(req.user.sub, req.params.id)
        .then(element => element ? res.json(element) : res.json({}))
        .catch(err => next(err));
}

/**
 * @route PUT /accounts/{id}
 * @group accounts - Operations about accounts
 * @param {string} id.path.required - id of the element to be updated
 * @param {Account.model} Account.body.required - data for element update
 * @returns {object} 200 - empty response
 * @returns {object} 400 - default error
 * @security JWT
 */
function update(req, res, next) {
    service.update(req.user.sub, req.params.id, req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

/**
 * @route DELETE /accounts/{id}
 * @group accounts - Operations about accounts
 * @param {string} id.path.required - id of the element to be removed
 * @returns {object} 200 - empty response
 * @returns {object} 400 - default error
 * @security JWT
 */
function _delete(req, res, next) {
    console.log(req.user)
    service.delete(req.user.sub, req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}