var APIError = module.exports = function APIError(status, message, properties) {
  if (!(this instanceof APIError)) return new APIError(status, message, properties)
  
  if (typeof message === 'object' || typeof message === 'array') {
    properties = message 
  }

  if (typeof status !== 'number') {
    message = status
    status = 500
  } else {
    message = require('http').STATUS_CODES[status]
  }

  this.name = this.constructor.name
  this.status = status
  this.message = message
  if (properties) this.properties = properties

  Error.captureStackTrace(this, this.constructor)
}

APIError.prototype.toString = function() {
  return this.name + ': ' + this.status + ': ' + this.message
}

require('util').inherits(module.exports, Error)
