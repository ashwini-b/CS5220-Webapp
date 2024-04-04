const router = require('express').Router();

const controller = require('./snippet.controller');

const middleware = require('../middleware/authorization.js')
// GET /snippets
router.get('/', controller.getSnippets);

// GET /snippets/:id
router.get('/:id', controller.getSnippetById);

// POST /snippets
router.post('/', middleware.verifyToken, controller.createSnippet);

// DELETE /snippets/:id
router.delete('/:id',middleware.verifyToken, controller.deleteSnippet);

module.exports = router;
