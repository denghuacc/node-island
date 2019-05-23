/*
 * @Author: Hale
 * @Description: Favor 模型
 * @Date: 2019-05-23
 * @LastEditTime: 2019-05-23
 */
const { sequelize } = require('../../core/db')
const { Sequelize, Model } = require('sequelize')
const { LikeError, DisLikeError } = require('../../core/http-exception')
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

    return sequelize.transaction(async t => {
      await Favor.create(
        {
          art_id,
          type,
          uid
        },
        { transaction: t }
      )
      const art = await Art.getData(art_id, type)
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
        force: true,
        transaction: t
      })
      const art = await Art.getData(art_id, type)
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
}

Favor.init(
  {
    uid: Sequelize.INTEGER,
    art_id: Sequelize.INTEGER,
    type: Sequelize.INTEGER
  },
  {
    sequelize,
    tableName: 'favour'
  }
)

module.exports = { Favor }
