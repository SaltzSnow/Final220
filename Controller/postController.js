const multer = require('multer')
const sharp = require('sharp')
const Post = require('../Model/postModel')
const catchAsy = require('../Error/catch')

const multerStorage = multer.memoryStorage()
const multerFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image')) {
      cb(null, true);
    }
  };
  
  const upload = multer({
    storage: multerStorage,
    fileFilter: multerFilter
  });
  
exports.uploadPostPhoto = upload.single('photo');
  
exports.resizePostPhoto = catchAsy(async (req, res, next) => {
    if (!req.file) return next();
  
    req.file.filename = `post-${req.user.id}-${Date.now()}.jpeg`;
  
    await sharp(req.file.buffer)
      .toFormat('jpeg')
      .jpeg({ quality: 100 })
      .toFile(`public/img/post/${req.file.filename}`);
  
    next();
});

exports.getallPost = catchAsy(async(req, res, next) => {
    const allPost = await Post.find()
    res.status(200).json({
        status: 'success',
        data: {allPost}
    })
})

exports.getPost = catchAsy(async(req, res, next) => {
    const onePost = await Post.findById(req.params.id)
    res.status(200).json({
        status: 'success',
        data: onePost
    })
})


exports.addPost = catchAsy(async (req, res, next) => {
    const { description } = req.body
    let postData
    if(!req.body.userId) req.body.userId = req.user.id
    if (!req.file) {
        postData = {
            userId: req.body.userId,
            description
        }
    }else {
        postData = {
            userId: req.body.userId,
            description,
            image: req.file.filename
        }
    }
    let post = await Post.create(postData)
    res.status(200).json({
        status: 'success',
        data: post
    })
})

exports.deletePost = catchAsy(async (req, res, next) => {
    const onePost = await Post.findById(req.params.id)
    if(req.user.id === onePost.userId){
        await Post.deleteOne(onePost)
    }
})