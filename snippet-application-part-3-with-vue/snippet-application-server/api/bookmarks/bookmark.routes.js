const router = require('express').Router();

const controller = require('./bookmark.controller');
const middleware = require('../middleware/authorization.js')

// POST /bookmarks
router.post('/',middleware.verifyToken, controller.createBookmark);

// DELETE /bookmarks/:id
router.delete('/:id', middleware.verifyToken, controller.deleteBookmark);

module.exports = router;
