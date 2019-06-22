/*
 * @Author: Hale
 * @Description: v1 classic API
 * @Date: 2019-05-17
 * @LastEditTime: 2019/06/22
 */
const Router = require('koa-router')
const {
  HttpException,
  ParameterException,
  NotFound
} = require('../../../core/http-exception')
const { Auth } = require('../../../middlewares/auth')
const {
  PositiveIntegerValidator,
  ClassicValidator
} = require('../../validators')
const { Flow } = require('../../models/flow')
const { Art } = require('../../models/art')
const { Favor } = require('../../models/favor')
const { successResponse } = require('../../lib/helper')

const router = new Router({
  prefix: '/v1/classic'
})

router.get('/latest', new Auth().middleware, async ctx => {
  const flow = await Flow.findOne({
    order: [['index', 'DESC']]
  })

  const art = await new Art(flow.art_id, flow.type).getData()
  art.setDataValue('index', flow.index)

  const likeStatus = await Favor.isUserLikeIt(
    flow.art_id,
    flow.type,
    ctx.auth.uid
  )

  art.setDataValue('like_status', likeStatus)

  successResponse({ ctx, data: art })
})

router.get('/:index/next', new Auth().middleware, async ctx => {
  const v = await new PositiveIntegerValidator().validate(ctx, { id: 'index' })
  const { index } = v.get('path')
  const flow = await Flow.findOne({
    where: {
      index: index + 1
    }
  })

  if (!flow) {
    throw new NotFound()
  }

  const art = await new Art(flow.art_id, flow.type).getData()
  art.setDataValue('index', flow.index)

  const likeNext = await Favor.isUserLikeIt(
    flow.art_id,
    flow.type,
    ctx.auth.uid
  )

  art.setDataValue('like_status', likeNext)

  successResponse({ ctx, data: art })
})

router.get('/:index/previous', new Auth().middleware, async ctx => {
  const v = await new PositiveIntegerValidator().validate(ctx, { id: 'index' })
  const { index } = v.get('path')
  const flow = await Flow.findOne({
    where: {
      index: index - 1
    }
  })

  if (!flow) {
    throw new NotFound()
  }

  const art = await new Art(flow.art_id, flow.type).getData()
  art.setDataValue('index', flow.index)

  const likeNext = await Favor.isUserLikeIt(
    flow.art_id,
    flow.type,
    ctx.auth.uid
  )

  art.setDataValue('like_status', likeNext)

  successResponse({ ctx, data: art })
})

// 获取期刊详情
router.get('/:type/:id/', new Auth().middleware, async ctx => {
  const v = await new ClassicValidator().validate(ctx)
  let { type, id } = v.get('path')
  type = parseInt(type)

  const artDetail = await new Art(id, type).getDetail(ctx.auth.uid)

  artDetail.art.setDataValue('like_status', artDetail.like_statue)

  successResponse({
    ctx,
    data: artDetail.art
  })
})

// 获取期刊的点赞情况
router.get('/:type/:id/favor', new Auth().middleware, async ctx => {
  const v = await new ClassicValidator().validate(ctx)
  let { type, id } = v.get('path')
  type = parseInt(type)

  const artDetail = await new Art(id, type).getDetail(ctx.auth.uid)

  successResponse({
    ctx,
    data: {
      fav_nums: artDetail.art.fav_nums,
      like_status: artDetail.like_statue
    }
  })
})

router.get('/favor', new Auth().middleware, async ctx => {
  const { uid } = ctx.auth
  const favor = await Favor.getMyClassicFavors(uid)
  successResponse({ ctx, data: favor })
})

module.exports = router
