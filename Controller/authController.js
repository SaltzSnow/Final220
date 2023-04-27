const { promisify } = require('util');
const jwt = require('jsonwebtoken')
const User = require('../Model/userModel')
const catchAsy = require('../Error/catch')

const signToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES,
    });
  };
  
const createSendToken = (user, req, res) => {
    const token = signToken(user._id);
    res.cookie('jwt', token, {
      httpOnly: true,
      secure: req.secure
    });
    
    user.password = undefined;
  
    res.status(200).json({
      status: 'success',
      token,
      data: {
        user,
      },
    });
};

exports.signup = catchAsy(async (req, res, next) => {
    const newUser = await User.create({
        name: req.body.name,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        password: req.body.password,
        passwordConfirm: req.body.passwordConfirm
    })
    createSendToken(newUser, req, res);
})

exports.login = catchAsy(async (req, res, next) => {
    const { email, password } = req.body
    if ( !email || !password ){
        return res.status(404).json({
            text: 'Must have email and password'
        })
    }
    const user = await User.findOne({email}).select('+password')

    if (!user || (password !== user.password)){
        return res.status(401).json({
            text: 'อีเมลหรือรหัสผ่านผิดพลาด'
        })
    }
    createSendToken(user, req, res);
})

exports.logout = (req, res) => {
    res.cookie('jwt', 'logout', {
      expires: new Date(Date.now() + 5 * 1000),
      httpOnly: true,
      secure: req.secure || req.headers('x-forwarded-proto') === 'https'
    })
    res.status(200).json({ status: 'success'})
}

exports.protect = catchAsy(async (req, res, next) => {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies.jwt) {
      token = req.cookies.jwt;
    }
  
    if (!token) {
      return next();
    }
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  
    const userCurrent = await User.findById(decoded.id);
    if (!userCurrent) {
      return next();
    }
  
    res.locals.user = userCurrent
    req.user = userCurrent;
    next();
});

exports.isLogin = async (req, res, next) => {
    try {
      if (req.cookies.jwt) {
        const decoded = await promisify(jwt.verify)(
          req.cookies.jwt,
          process.env.JWT_SECRET
        );
  
        const userCurrent = await User.findById(decoded.id);
        if (!userCurrent) {
          return next();
        }
  
        if (userCurrent.TimeStamp(decoded.iat)) {
          return next();
        }
  
        res.locals.user = userCurrent;
        return next();
      }
    } catch (err) {
      return next();
    }
    next();
};