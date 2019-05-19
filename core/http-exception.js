/*
 * @Author: Hale
 * @Description: 异常处理相关
 * @Date: 2019-05-17
 * @LastEditTime: 2019-05-19
 */
class HttpException extends Error {
  constructor(msg = '服务器异常', errorCode = 10000, code = 400) {
    super()
    this.msg = msg
    this.errorCode = errorCode
    this.code = code
  }
}

class ParameterException extends HttpException {
  constructor(msg = '参数错误', errorCode = 10000) {
    super()
    this.msg = msg
    this.errorCode = errorCode
    this.code = 400
  }
}

class NotFound extends HttpException {
  constructor(msg = '资源未找到', errorCode = 10000) {
    super()
    this.msg = msg
    this.errorCode = errorCode
    this.code = 404
  }
}

class AuthFailed extends HttpException {
  constructor(msg = '授权失败', errorCode = 100004) {
    super()
    this.msg = msg
    this.errorCode = errorCode
    this.code = 401
  }
}

class Forbidden extends HttpException {
  constructor(msg = '禁止访问', errorCode = 10006) {
    super()
    this.msg = msg
    this.errorCode = errorCode
    this.code = 403
  }
}

module.exports = {
  HttpException,
  ParameterException,
  NotFound,
  AuthFailed,
  Forbidden
}
