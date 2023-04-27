const express = require('express')
const postController = require('../Controller/postController')
const authController = require('../Controller/authController')
const router = express.Router()

router.get('/', authController.protect, postController.getallPost)
router.get('/:id', authController.protect, postController.getPost).delete(authController.protect, postController.deletePost)
router.post('/post', authController.protect, postController.uploadPostPhoto, postController.resizePostPhoto, postController.addPost)

module.exports = router