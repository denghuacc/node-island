/*
 * @Author: Hale
 * @Description: 辅助函数
 * @Date: 2019-05-19
 * @LastEditTime: 2019-05-19
 */

// 验证成功回复
function successResponse({
  ctx,
  status = 201,
  data = {},
  msg = 'ok',
  errorCode = 0
}) {
  ctx.status = status
  ctx.body = {
    error_code: errorCode,
    msg,
    data,
    request: `${ctx.method} ${ctx.path}`
  }
}

module.exports = { successResponse }
