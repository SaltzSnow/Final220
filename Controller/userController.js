const multer = require('multer')
const sharp = require('sharp')
const User = require('../Model/userModel')
const catchAsy = require('../Error/catch')

exports.getallUser = catchAsy(async (req, res, next) => {
    const user = await User.find()
    res.status(200).json({
        status: 'success',
        data: {
            user
        }
    })
})

exports.getUser = catchAsy(async (req, res, next) => {
    const user = await User.findById(req.user.id)
    res.status(200).json({
        status: 'success',
        data: {
            user
        }
    })
})


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
  
exports.uploaduserPhoto = upload.single('photo');
  
exports.resizeuserPhoto = catchAsy(async (req, res, next) => {
    if (!req.file) return next();
  
    req.file.filename = `user-${req.user.id}-${Date.now()}.jpeg`;
  
    await sharp(req.file.buffer)
      .resize(500, 500)
      .toFormat('jpeg')
      .jpeg({ quality: 90 })
      .toFile(`public/img/user/${req.file.filename}`);
  
    next();
});


exports.updateMe = catchAsy(async (req, res, next) => {
    if (!req.file) return next();
    const user = await User.findByIdAndUpdate(req.user.id, {photo: req.file.filename})
    //user.photo = req.file.filename
    //await user.save()
    res.status(200).json({
        status: 'success'
    })
})
  