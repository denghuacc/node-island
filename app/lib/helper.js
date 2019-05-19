/*
 * @Author: Hale
 * @Description: 辅助函数
 * @Date: 2019-05-19
 * @LastEditTime: 2019-05-19
 */

// 验证成功回复
function successResponse(ctx, msg = 'ok', errorCode = 0) {
  ctx.status = 201
  ctx.body = {
    msg,
    error_code: errorCode,
    request: `${ctx.method} ${ctx.path}`
  }
}

module.exports = { successResponse }
