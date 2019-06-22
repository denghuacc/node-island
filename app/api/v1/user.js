/*
 * @Author: Hale
 * @Description: v1 user API
 * @Date: 2019-05-18
 * @LastEditTime: 2019/06/22
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

  const { email, password, nickname } = v.get('body')

  const user = {
    email,
    password,
    nickname
  }

  await User.create(user)

  successResponse({ ctx })
})

module.exports = router
