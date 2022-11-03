const express = require('express');
const userController = require('../controllers/user.controller');

const router = express.Router();

router.post('/', userController.createUser);
router.get('/', userController.getUser);
router.get('/:id', userController.getById);
router.delete('/me', userController.delMe);

module.exports = router;