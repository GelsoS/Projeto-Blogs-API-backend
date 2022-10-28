const express = require('express');
const categoryController = require('../controllers/category.controller');

const router = express.Router();

router.post('/', categoryController.createCategory);
router.get('/', categoryController.getCategory);

module.exports = router;