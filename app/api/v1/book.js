/*
 * @Author: Hale
 * @Description: v1 book router
 * @Date: 2019-05-17
 * @LastEditTime: 2019-06-08
 */
const Router = require('koa-router')
const { HotBook } = require('../../models/hot-book')
const { Book } = require('../../models/book')
const { Favor } = require('../../models/favor')
const { BookComment } = require('../../models/book-comment')
const {
  PositiveIntegerValidator,
  SearchValidator,
  AddShortCommentValidator
} = require('../../validators')
const { successResponse } = require('../../lib/helper')
const { Auth } = require('../../../middlewares/auth')

const router = new Router({
  prefix: '/v1/book'
})

router.get('/hot_list', async ctx => {
  const books = await HotBook.getAll()
  successResponse({ ctx, data: books })
})

router.get('/:id/detail', async ctx => {
  const v = await new PositiveIntegerValidator().validate(ctx)
  const { id } = v.get('path')
  const detail = await Book.getDetail(id)
  successResponse({ ctx, data: detail })
})

router.get('/search', async ctx => {
  const v = await new SearchValidator().validate(ctx)
  const { q, count, start, summary } = v.get('query')
  const result = await Book.getSearchInfo(encodeURI(q), count, start, summary)
  successResponse({ ctx, data: result })
})

router.get('/favor/count', new Auth().middleware, async ctx => {
  const count = await Book.getMyFavorBookCount(ctx.auth.uid)
  successResponse({ ctx, data: { count } })
})

router.get('/:book_id/favor', new Auth().middleware, async ctx => {
  const v = await new PositiveIntegerValidator().validate(ctx, {
    id: 'book_id'
  })
  const { book_id } = v.get('path')
  const favor = await Favor.getBookFavor(ctx.auth.uid, book_id)
  successResponse({ ctx, data: favor })
})

router.post('/add/short_comment', new Auth().middleware, async ctx => {
  const v = await new AddShortCommentValidator().validate(ctx, {
    id: 'book_id'
  })
  const { book_id, content } = v.get('body')
  console.log(book_id, content)
  const add = await BookComment.addComment(book_id, content)
  successResponse({ ctx })
})

router.get('/:book_id/short_comment', new Auth().middleware, async ctx => {
  const v = await new PositiveIntegerValidator().validate(ctx, {
    id: 'book_id'
  })

  const { book_id } = v.get('path')
  const comments = await BookComment.getComment(book_id)
  successResponse({ ctx, data: comments })
})

module.exports = router
