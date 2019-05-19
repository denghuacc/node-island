/*
 * @Author: Hale
 * @Description: v1 user API
 * @Date: 2019-05-18
 * @LastEditTime: 2019-05-19
 */
const Router = require('koa-router')
const { RegisterValidator } = require('../../validators')
const { User } = require('../../models/user')
const { successResponse } = require('../../lib/helper')

const router = new Router({
  prefix: '/v1/user'
})

router.post('/register', async (ctx, next) => {
  const v = await new RegisterValidator().validate(ctx)

  const user = {
    email: v.get('body.email'),
    password: v.get('body.password2'),
    nickname: v.get('body.nickname')
  }

  await User.create(user)

  successResponse(ctx)
})

module.exports = router
