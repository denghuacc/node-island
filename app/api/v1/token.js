/*
 * @Author: Hale
 * @Description: v1 token API
 * @Date: 2019-05-17
 * @LastEditTime: 2019/06/22
 */
const Router = require('koa-router')
const { TokenValidator, NotEmptyValidator } = require('../../validators')
const { LoginType } = require('../../lib/enum')
const { User } = require('../../models/user')
const { ParameterException } = require('../../../core/http-exception')
const { generateToken } = require('../../../core/util')
const { successResponse } = require('../../lib/helper')
const { Auth } = require('../../../middlewares/auth')
const { WXManger } = require('../../services/wx')

const router = new Router({
  prefix: '/v1/token'
})

router.post('/', async (ctx, next) => {
  const v = await new TokenValidator().validate(ctx)

  const { type, account, secret } = v.get('body')

  let token
  switch (type) {
    case LoginType.USER_EMAIL:
      token = await emailLogin(account, secret)
      break

    case LoginType.USER_MINI_PROGRAM:
      token = await WXManger.codeToToken(account)
      break

    default:
      throw new ParameterException('没有响应的处理函数')
  }

  successResponse({ ctx, status: 200, data: { token } })
})

router.post('/verify', async ctx => {
  const v = await new NotEmptyValidator().validate(ctx)
  const { token } = v.get('body')
  const result = Auth.verifyToken(token)
  successResponse({ ctx, data: { is_valid: result } })
})

async function emailLogin(account, secret) {
  const user = await User.verifyEmailAndPassword(account, secret)
  return generateToken(user.id, Auth.USER)
}

module.exports = router
