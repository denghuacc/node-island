/*
 * @Author: Hale
 * @Description: v1 classic API
 * @Date: 2019-05-17
 * @LastEditTime: 2019-05-18
 */
const Router = require('koa-router')
const {
  HttpException,
  ParameterException
} = require('../../../core/http-exception')

const { PositiveIntegerValidator } = require('../../validators')

const router = new Router()

router.post('/v1/:id/classic/latest', async (ctx, next) => {
  const { params, query, header } = ctx
  const { body } = ctx.request

  if (global.config.env === 'development') {
    throw 'error'
  }

  const v = new PositiveIntegerValidator().validate(ctx)
  const id = v.get('path.id')

  ctx.body = typeof id
})

module.exports = router
