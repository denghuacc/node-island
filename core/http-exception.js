/*
 * @Author: Hale
 * @Description: 异常处理类
 * @Date: 2019-05-17
 * @LastEditTime: 2019-05-17
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

module.exports = { HttpException, ParameterException }
