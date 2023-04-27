const mongoose = require('mongoose')
const validator = require('validator')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        maxlength: 20
    },
    description:{
        type: String,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate: validator.isEmail
    },
    phoneNumber: {
        type: Number,
        maxlength: 10,
        validate: validator.isInt
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        select: false
    },
    passwordConfirm: {
        type: String,
        required: true,
        validate: {
            validator: function(el){
                return el === this.password
            },
            message: 'password not the same'
        }
    },
    photo: {
        type: String
    }
})

userSchema.pre('save', async function (next) {
    this.passwordConfirm = undefined;
    next();
});



const User = mongoose.model('User', userSchema)
module.exports = User