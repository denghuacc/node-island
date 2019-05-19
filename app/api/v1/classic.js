/*
 * @Author: Hale
 * @Description: v1 classic API
 * @Date: 2019-05-17
 * @LastEditTime: 2019-05-19
 */
const Router = require('koa-router')
const {
  HttpException,
  ParameterException
} = require('../../../core/http-exception')
const { Auth } = require('../../../middlewares/auth')

const { PositiveIntegerValidator } = require('../../validators')

const router = new Router({
  prefix: '/v1/classic'
})

router.get('/latest', new Auth(8).middleware, async (ctx, next) => {
  ctx.body = ctx.auth
})

module.exports = router
