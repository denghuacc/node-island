/*
 * @Author: Hale
 * @Description: 数据库相关
 * @Date: 2019-05-18
 * @LastEditTime: 2019-05-18
 */

const Sequelize = require('sequelize')
const { name, host, port, user, password } = require('../config').database

const sequelize = new Sequelize(name, user, password, {
  dialect: 'mysql',
  host,
  port,
  logging: global.config.env === 'development',
  timezone: '+08:00',
  define: {
    timestamps: true,
    paranoid: true, // 生成 deletedAt 字段
    // createdAt: 'created_at',
    // updatedAt: 'updated_at',
    // deletedAt: 'deleted_at',
    underscored: true // 全部改成下划线形式
  }
})

// 同步 init 到数据库
sequelize.sync({
  force: true // 是否强行增加字段，会把原来的表的数据删除，生成环境不建议使用
})

module.exports = { sequelize }
