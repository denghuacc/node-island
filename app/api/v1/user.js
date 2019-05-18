/*
 * @Author: Hale
 * @Description: v1 user API
 * @Date: 2019-05-18
 * @LastEditTime: 2019-05-18
 */
const Router = require('koa-router')
const { RegisterValidator } = require('../../validators')

const router = new Router({
  prefix: '/v1/user'
})

router.post('/register', async (ctx, next) => {
  const v = new RegisterValidator().validate(ctx)
})

module.exports = router
