const router = require('express').Router();

const controller = require('./user.controller');
const middleware = require('../middleware/authorization.js')

// GET /users/:id
router.get('/:id', controller.getUserById);

// POST /users
router.post('/register', controller.registerUser);

// PUT /users/:id
router.put('/:id', middleware.verifyToken, controller.updateUser);

router.post('/login', controller.loginUser);

module.exports = router;
