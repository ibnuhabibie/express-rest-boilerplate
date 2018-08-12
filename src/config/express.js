const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const compress = require('compression')
const methodOverride = require('method-override')
const cors = require('cors')
const helmet = require('helmet')

require('dotenv').config()
require('express-async-errors')

const routes = require('../route')
const { sendToChannel } = require('../tool/slack')

const app = express()

app.use(morgan('tiny'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(compress())
app.use(methodOverride())
app.use(helmet())
app.use(cors())

app.use('/', routes)

app.use((err, req, res, next) => {
  console.error(req.method, '::', req.path, '::', 'error', err)
  if (process.env.NODE_ENV !== 'development') sendToChannel(err, req)
  res.status(err.status || 500).json({ error: err.message })
})

module.exports = app