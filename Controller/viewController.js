const User = require('../Model/userModel')
const Post = require('../Model/postModel')
const catchAsy = require('../Error/catch')

exports.homepage = catchAsy(async (req, res, next) => {
    const post = await Post.find()
    console.log(post)
    res.status(200).render('homepage', {
        post
    })
})

exports.createAd = (req, res) => {
    res.status(200).render('create_ad')
}

exports.personal = catchAsy(async (req, res, next) => {
    const user = await User.findById(req.params.id)
    res.status(200).render('pat', {
        user
    })
})

exports.payment = (req, res) => {
    res.status(200).render('payment')
}

exports.register = (req, res) => {
    res.status(200).render('register')
}

exports.login = (req, res) => {
    res.status(200).render('log-in')
}