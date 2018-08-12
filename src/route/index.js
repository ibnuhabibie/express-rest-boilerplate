const express = require('express')

const ApiError = require('../lib/error')
const router = express.Router()

router.get('/', async (req, res) => res.send('Hello World'))

router.get('/test-error', async (req, res) => {
  throw new ApiError(404, { custom: 'custom props' })
})

module.exports = router
