/*
 * @Author: Hale
 * @Description: classic 模型
 * @Date: 2019-05-20
 * @LastEditTime: 2019-05-20
 */
const { sequelize } = require('../../core/db')
const { Sequelize, Model } = require('sequelize')

const classicFields = {
  image: Sequelize.STRING,
  content: Sequelize.STRING,
  pubdate: Sequelize.DATEONLY,
  fav_nums: Sequelize.INTEGER,
  title: Sequelize.STRING,
  type: Sequelize.TINYINT
}

class Movie extends Model {}

Model.init(classicFields, { sequelize, tableName: 'movie' })

class Sentence extends Model {}

Model.init(classicFields, { sequelize, tableName: 'sentence' })

class Music extends Model {}

const musicFields = Object.assign(classicFields, { url: Sequelize.STRING })

Model.init(musicFields, { sequelize, tableName: 'music' })

module.exports = { Movie, Sentence, Music }
