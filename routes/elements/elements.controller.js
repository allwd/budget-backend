const express = require('express');
const router = express.Router();
const service = require('./elements.service');

// routes
router.get('/', getAll);
router.post('/', create);
router.get('/:id', getById);
router.put('/:id', update);
router.delete('/:id', _delete);

module.exports = router;

/**
 * @route GET /elements/
 * @group elements - Operations about elements
 * @returns {Element[]} 200 - Array of elements
 * @returns {object} 400 - default error
 * @security JWT
 */
function getAll(req, res, next) {
    service.getAll(req.user.sub)
        .then(element => element ? res.json(element) : res.json([]))
        .catch(err => next(err));
}

/**
 * @route POST /elements/
 * @group elements - Operations about elements
 * @param {Element.model} Element.body.required - data for element creation
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
 * @route GET /elements/{id}
 * @group elements - Operations about elements
 * @param {string} id.path.required - id of the element to be fetched
 * @returns {Element.model} 200 - element
 * @returns {object} 400 - default error
 * @security JWT
 */
function getById(req, res, next) {
    service.getById(req.user.sub, req.params.id)
        .then(element => element ? res.json(element) : res.json({}))
        .catch(err => next(err));
}

/**
 * @route PUT /elements/{id}
 * @group elements - Operations about elements
 * @param {string} id.path.required - id of the element to be updated
 * @param {Element.model} Element.body.required - data for element update
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
 * @route DELETE /elements/{id}
 * @group elements - Operations about elements
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