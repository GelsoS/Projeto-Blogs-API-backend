const express = require('express');
const userController = require('../controllers/user.controller');

const router = express.Router();

router.post('/', userController.createUser);
router.get('/', userController.getUser);
router.get('/:id', userController.getById);

module.exports = router;