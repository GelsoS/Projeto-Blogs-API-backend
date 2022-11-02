const express = require('express');
const postController = require('../controllers/post.controller');

const router = express.Router();

router.post('/', postController.addPost);
router.get('/', postController.get);
router.get('/:id', postController.getId);
router.put('/:id', postController.putId);

module.exports = router;