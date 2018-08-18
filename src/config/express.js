const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const compress = require('compression')
const methodOverride = require('method-override')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const helmet = require('helmet')
const i18n = require('i18n')

require('dotenv').config()
require('express-async-errors')

const routes = require('../route')
const { sendToChannel } = require('../tool/slack')

const app = express()

i18n.configure({
  locales: ['en', 'id'],
  defaultLocale: 'en',
  cookie: 'locale',
  directory: 'locales',
  objectNotation: true
})

app.use(compress())
app.use(morgan('dev'))
app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(methodOverride())
app.use(helmet())
app.use(cors())
app.use(i18n.init)

app.use('/', routes)

// Catch 404 and forward to error handler
app.use((req, res, next) => {
  const error = new Error("We are looking for your page,. but we can't find it")
  error.status = 404
  error.title = 'Page Not Found'
  next(error)
})

app.use((err, req, res, next) => {
  console.error(`${req.method} :: ${req.path} :: error :: ${err}`)
  console.error(err)
  if (process.env.NODE_ENV !== 'development') sendToChannel(err, req)
  res.status(err.status || 500).json({ error: err.message })
})

module.exports = app
