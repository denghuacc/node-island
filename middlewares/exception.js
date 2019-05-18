/*
 * @Author: Hale
 * @Description: 全局异常处理中间件
 * @Date: 2019-05-17
 * @LastEditTime: 2019-05-18
 */
const { HttpException } = require('../core/http-exception')

const catchError = async (ctx, next) => {
  try {
    await next()
  } catch (error) {
    const isHttpException = error instanceof HttpException
    const isDev = global.config.env === 'development'

    // 开发环境抛出未知异常
    if (isDev && !isHttpException) {
      throw error
    }

    // 已知异常
    if (error instanceof HttpException) {
      ctx.status = error.code
      ctx.body = {
        msg: error.msg,
        error_code: error.errorCode,
        request: `${ctx.method} ${ctx.path}`
      }
      // 未知异常
    } else {
      ctx.status = 400
      ctx.body = {
        msg: '服务器内部错误',
        error_code: 999,
        request: `${ctx.method} ${ctx.path}`
      }
    }
  }
}

module.exports = catchError
