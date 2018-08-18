const multer = require('multer')
const path = require('path')

var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'uploads')
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname)
  }
})

var upload = multer({
  storage: storage,
  fileFilter: function(req, file, callback) {
    var ext = path.extname(file.originalname)

    if (ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
      return callback(new Error('Only images are allowed'))
    }

    if (!file) return callback(new Error('Image is required'))

    callback(null, true)
  }
})

// multer validation example
const validateImage = fieldname => {
  return (req, res, next) => {
    if (fieldname instanceof Array) {
      fieldname.forEach(field => {
        let image = !req.files[field]
        if (image || image.length) throw new Error(`${field} is required`)
      })
    } else {
      if (!req.file) throw new Error(`${fieldname} is required`)
    }
    next()
  }
}

module.exports = {
  upload,
  validateImage
}
