const express = require('express')

const APIError = require('../lib/error')
const { upload, validateImage } = require('../config/multer')
const validation = require('./validation')

const router = express.Router()

router.get('/health-check', async (req, res) => {
  res.json({
    status: 200,
    name: process.env.APP_NAME,
    message: 'ok'
  })
})

router.get('/multi-language', async (req, res) => {
  res.json({ req: req.__('hello %s', 'Marcus'), res: res.__('hello') })
})

router.get('/test-error', async (req, res) => {
  throw new APIError('Some message', 500, { custom: 'hello' })
})

router.post(
  '/upload-single',
  upload.single('avatar'),
  validateImage('avatar'),
  async (req, res) => {
    res.json({ body: req.body, file: req.file })
  }
)

router.post(
  '/upload-multi',
  upload.fields([
    { name: 'avatar', maxCount: 1 },
    { name: 'gallery', maxCount: 2 }
  ]),
  validateImage(['avatar', 'gallery']),
  async (req, res) => {
    res.json({ body: req.body, file: req.files })
  }
)

router.post(
  '/register',
  validation.register,
  validation.validate,
  async (req, res) => {
    res.json({ body: req.body })
  }
)

module.exports = router
