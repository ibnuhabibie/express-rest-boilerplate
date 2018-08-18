const { check, validationResult } = require('express-validator/check')
const i18n = require('i18n')

const validate = (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() })
  }
  next()
}

const register = [
  check('username')
    .isEmail()
    .withMessage((value, { req, location, path }) => {
      return req.__('validation.email', {
        value,
        location,
        path
      })
    }),
  check('password')
    .isLength({ min: 5 })
    .withMessage('must be at least 5 chars long')
]

module.exports = {
  validate,
  register
}
