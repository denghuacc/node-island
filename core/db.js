/*
 * @Author: Hale
 * @Description: 数据库相关
 * @Date: 2019-05-18
 * @LastEditTime: 2019-05-29
 */

const Sequelize = require('sequelize')
const { dbName, host, port, user, password } = require('../config').database

const sequelize = new Sequelize(dbName, user, password, {
  dialect: 'mysql',
  host,
  port,
  logging: true,
  timezone: '+08:00',
  define: {
    timestamps: true,
    paranoid: true, // 生成 deletedAt 字段
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
    underscored: true, // 全部字段修改成下划线形式
    freezeTableName: true,
    scopes: {
      // 忽略字段
      bh: {
        attributes: {
          exclude: ['created_at', 'updated_at', 'deleted_at']
        }
      }
    }
  }
})

// 同步 init 到数据库
sequelize.sync({
  force: false // 是否强行增加字段，会把原来的表的数据删除，生产环境不建议使用
})

module.exports = { sequelize }
