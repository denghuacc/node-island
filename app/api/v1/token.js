/*
 * @Author: Hale
 * @Description: v1 token API
 * @Date: 2019-05-17
 * @LastEditTime: 2019-05-19
 */
const Router = require('koa-router')
const { TokenValidator } = require('../../validators')
const { loginType } = require('../../lib/enum')
const { User } = require('../../models/user')
const { ParameterException } = require('../../../core/http-exception')

const router = new Router({
  prefix: '/v1/token'
})

router.post('/', async (ctx, next) => {
  const v = await new TokenValidator().validate(ctx)

  const type = v.get('body.type')
  const account = v.get('body.account')
  const secret = v.get('body.secret')

  switch (type) {
    case loginType.USER_EMAIL:
      await emailLogin(account, secret)
      break

    case loginType.USER_MINI_PROGRAM:
      break
    default:
      throw new ParameterException('没有响应的处理函数')
  }
})

async function emailLogin(account, secret) {
  const user = await User.verifyEmailAndPassword(account, secret)
}

module.exports = router
