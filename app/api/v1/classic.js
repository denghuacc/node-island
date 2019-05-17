/*
 * @Author: Hale
 * @Description: v1 classic router
 * @Date: 2019-05-17
 * @LastEditTime: 2019-05-17
 */
const Router = require('koa-router')

const router = new Router({
  prefix: '/v1/classic'
})

router.get('/', async (ctx, next) => {
  ctx.body = 'hello classic'
})

module.exports = router
