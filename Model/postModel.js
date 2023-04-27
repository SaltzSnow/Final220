const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    description: {
        type: String,
        maxlength: 300,
        require: true
    },
    like: {
        type: Number,
        default: 0
    },
    photo: {
        type: String
    }
}, {
    timestamps: true
})

postSchema.pre(/^find/, function(next){
    this.populate({
        path: 'userId',
        select: 'name email'
    })
    next()
})

const Post = mongoose.model('Post', postSchema)
module.exports = Post