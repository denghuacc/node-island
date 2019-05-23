/*
 * @Author: Hale
 * @Description: v1 classic API
 * @Date: 2019-05-17
 * @LastEditTime: 2019-05-23
 */
const Router = require('koa-router')
const {
  HttpException,
  ParameterException
} = require('../../../core/http-exception')
const { Auth } = require('../../../middlewares/auth')
const { PositiveIntegerValidator } = require('../../validators')
const { Flow } = require('../../models/flow')
const { Art } = require('../../models/art')
const { Favor } = require('../../models/favor')
const { successResponse } = require('../../lib/helper')

const router = new Router({
  prefix: '/v1/classic'
})

router.get('/latest', new Auth().middleware, async (ctx, next) => {
  const flow = await Flow.findOne({
    order: [['index', 'DESC']]
  })

  const art = await Art.getData(flow.art_id, flow.type)
  art.setDataValue('index', flow.index)

  const likeStatus = await Favor.isUserLikeIt(
    flow.art_id,
    flow.type,
    ctx.auth.uid
  )
  art.setDataValue('like_status', likeStatus)

  successResponse({ ctx, data: { art } })
})

module.exports = router
