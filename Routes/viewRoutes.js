const express = require('express')
const viewController = require('../Controller/viewController')
const authController = require('../Controller/authController')

const router = express.Router()

router.get('/', authController.isLogin, viewController.homepage)
router.get('/createad', authController.protect, viewController.createAd)
router.get('/profile', authController.isLogin, viewController.personal)
router.get('/payment', authController.isLogin, viewController.payment)
router.get('/signup', authController.isLogin, viewController.register)
router.get('/login', authController.isLogin, viewController.login)

module.exports = router
