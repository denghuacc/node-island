/*
 * @Author: Hale
 * @Description: book-comment model
 * @Date: 2019-06-08
 * @LastEditTime: 2019-06-08
 */

const { Sequelize, Model, Op } = require('sequelize')
const { sequelize } = require('../../core/db')

class BookComment extends Model {
  static async addComment(book_id, content) {
    const comment = await BookComment.findOne({
      where: {
        book_id,
        content
      }
    })

    if (!comment) {
      return await BookComment.create({
        book_id,
        content,
        nums: 1
      })
    } else {
      return await comment.increment('nums', { by: 1 })
    }
  }

  static async getComment(book_id) {
    const comment = await BookComment.findAll({
      where: {
        book_id
      }
    })

    return comment
  }
}

BookComment.init(
  {
    book_id: Sequelize.INTEGER,
    content: Sequelize.STRING(12),
    nums: {
      type: Sequelize.INTEGER,
      defaultValue: 0
    }
  },
  {
    sequelize,
    tableName: 'book_comment'
  }
)

module.exports = { BookComment }
