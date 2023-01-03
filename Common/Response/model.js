class HttpResp {
  constructor (_statusCode, _code) {
    this.status = _statusCode
    this.code = _code
  }

  toJson () {
    return JSON.stringify(this)
  }
}

class SuccessResp extends HttpResp {
  constructor (_statusCode, _code, _data) {
    super(_statusCode, _code)
    this.data = _data
  }
}

class ErrorResp extends HttpResp {
  constructor (_statusCode, _code, message) {
    super(_statusCode, _code)
    this.error = new Error(message)
  }
}

class ValidationErrResp extends HttpResp {
  constructor (_statusCode, _code, _errors) {
    super(_statusCode, _code)
    this.error = _errors
  }
}

class Error {
  constructor (_message) {
    this.message = _message
  }
}

class FieldError extends Error {
  constructor(_field, _message) {
    super(_message)
    this.field = _field
  }
}

module.exports = {
  SuccessResp: SuccessResp,
  ErrorResp: ErrorResp,
  ValidationErrResp: ValidationErrResp,
  FieldError: FieldError
}
