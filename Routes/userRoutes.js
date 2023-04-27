const express = require('express')
const userController = require('../Controller/userController')
const authController = require('../Controller/authController')
const router = express.Router()

router.get('/', userController.getallUser)
router.post('/signup', authController.signup)
router.post('/login', authController.login)
router.get('/logout', authController.logout)
router.get('/profile', authController.protect, userController.getUser)
router.patch('/profile', authController.protect, userController.uploaduserPhoto, userController.resizeuserPhoto, userController.updateMe)

module.exports = router