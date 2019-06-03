/*
 * @Author: Hale
 * @Description: v1 book router
 * @Date: 2019-05-17
 * @LastEditTime: 2019-06-03
 */
const Router = require('koa-router')
const { HotBook } = require('../../models/hot-book')
const { successResponse } = require('../../lib/helper')

const router = new Router({
  prefix: '/v1/book'
})

router.get('/hot_list', async ctx => {
  const books = await HotBook.getAll()
  successResponse({ ctx, data: books })
})

module.exports = router
