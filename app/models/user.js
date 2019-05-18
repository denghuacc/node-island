/*
 * @Author: Hale
 * @Description: user 模型
 * @Date: 2019-05-18
 * @LastEditTime: 2019-05-18
 */
const { sequelize } = require('../../core/db')
const { Sequelize, Model } = require('sequelize')

class User extends Model {
  constructor() {
    super()
  }
}

User.init(
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true, // 主键
      autoIncrement: true // 自动增长
    },
    nickname: Sequelize.STRING,
    email: Sequelize.STRING,
    password: Sequelize.STRING,
    openid: {
      type: Sequelize.STRING(64),
      unique: true
    }
  },
  {
    sequelize,
    tableName: 'user' // 自定义表格名称
  }
)

module.exports = User
