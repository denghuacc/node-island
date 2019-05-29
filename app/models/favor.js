/*
 * @Author: Hale
 * @Description: Favor 模型
 * @Date: 2019-05-23
 * @LastEditTime: 2019-05-29
 */
const { sequelize } = require('../../core/db')
const { Sequelize, Model, Op } = require('sequelize')
const {
  LikeError,
  DisLikeError,
  NotFound
} = require('../../core/http-exception')
const { Art } = require('./art')

class Favor extends Model {
  static async like(art_id, type, uid) {
    const favor = await Favor.findOne({
      where: {
        art_id,
        type,
        uid
      }
    })

    if (favor) {
      throw new LikeError()
    }

    // 返回事务
    return sequelize.transaction(async t => {
      await Favor.create(
        {
          art_id,
          type,
          uid
        },
        { transaction: t }
      )
      const art = await new Art(art_id, type).getData(false)
      await art.increment('fav_nums', { by: 1, transaction: t })
    })
  }

  static async dislike(art_id, type, uid) {
    const favor = await Favor.findOne({
      where: {
        art_id,
        type,
        uid
      }
    })

    if (!favor) {
      throw new DisLikeError()
    }

    return sequelize.transaction(async t => {
      await favor.destroy({
        force: true, // 物理删除
        transaction: t
      })
      const art = await new Art(art_id, type).getData(false)
      await art.decrement('fav_nums', { by: 1, transaction: t })
    })
  }

  static async isUserLikeIt(art_id, type, uid) {
    const favor = await Favor.findOne({
      where: {
        art_id,
        type,
        uid
      }
    })

    return favor ? true : false
  }

  static async getMyClassicFavors(uid) {
    const arts = await Favor.findAll({
      where: {
        uid,
        type: {
          [Op.not]: 400
        }
      }
    })

    if (!arts) {
      throw new NotFound()
    }

    return await Art.getList(arts)
  }
}

Favor.init(
  {
    uid: Sequelize.INTEGER,
    art_id: Sequelize.INTEGER,
    type: Sequelize.INTEGER
  },
  {
    sequelize,
    tableName: 'favor'
  }
)

module.exports = { Favor }
