const express = require('express')

const APIError = require('../lib/error')
const router = express.Router()

router.get('/health-check', async (req, res) => {
  res.json({
    status: 200,
    name: process.env.APP_NAME,
    message: 'ok'
  })
})

router.get('/test-error', async (req, res) => {
  throw new APIError('Some message', 500, { custom: 'hello' })
})

module.exports = router
