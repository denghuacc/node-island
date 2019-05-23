/*
 * @Author: Hale
 * @Description: Flow 模型
 * @Date: 2019-05-23
 * @LastEditTime: 2019-05-23
 */
const { sequelize } = require('../../core/db')
const { Sequelize, Model } = require('sequelize')

class Flow extends Model {}

Flow.init(
  {
    index: Sequelize.INTEGER,
    art_id: Sequelize.INTEGER,
    type: Sequelize.INTEGER
  },
  {
    sequelize,
    tablaName: 'flow'
  }
)

module.exports = { Flow }
