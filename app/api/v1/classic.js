/*
 * @Author: Hale
 * @Description: v1 classic router
 * @Date: 2019-05-17
 * @LastEditTime: 2019-05-17
 */
const Router = require('koa-router')
const {
  HttpException,
  ParameterException
} = require('../../../core/http-exception')

const router = new Router()

router.post('/v1/:id/classic/latest', async (ctx, next) => {
  const { params, query, headers } = ctx
  const { body } = ctx.request

  if (true) {
    const error = new ParameterException()
    throw error
  }
})

module.exports = router
