/*
 * @Author: Hale
 * @Description: 全局异常处理中间件
 * @Date: 2019-05-17
 * @LastEditTime: 2019-05-17
 */
const { HttpException } = require('../core/http-exception')

const catchError = async (ctx, next) => {
  try {
    await next()
  } catch (error) {
    if (error instanceof HttpException) {
      ctx.status = error.code
      ctx.body = {
        msg: error.msg,
        error_code: error.errorCode,
        request: `${ctx.method} ${ctx.path}`
      }
    }
  }
}

module.exports = catchError
