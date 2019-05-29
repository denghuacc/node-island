/*
 * @Author: Hale
 * @Description: v1 like API
 * @Date: 2019-05-23
 * @LastEditTime: 2019-05-29
 */
const Router = require('koa-router')
const { Auth } = require('../../../middlewares/auth')
const { LikeValidator } = require('../../validators')
const { Favor } = require('../../models/favor')
const { successResponse } = require('../../lib/helper')

const router = new Router({
  prefix: '/v1/like'
})

// 点赞
router.post('/', new Auth().middleware, async ctx => {
  const v = await new LikeValidator().validate(ctx, { id: 'art_id' })
  const art_id = v.get('body.art_id')
  const type = v.get('body.type')
  const { uid } = ctx.auth
  await Favor.like(art_id, type, uid)
  successResponse({ ctx })
})

// 取消点赞
router.post('/cancel', new Auth().middleware, async ctx => {
  const v = await new LikeValidator().validate(ctx, { id: 'art_id' })
  const art_id = v.get('body.art_id')
  const type = v.get('body.type')
  const { uid } = ctx.auth
  await Favor.dislike(art_id, type, uid)
  successResponse({ ctx })
})

module.exports = router
