/*
 * @Author: Hale
 * @Description: 程序主入口
 * @Date: 2019-05-17
 * @LastEditTime: 2019-05-17
 */
const Koa = require('koa')
const axios = require('axios')
const InitManager = require('./core/init')

const app = new Koa()

InitManager.initCore(app)

app.listen(3000, err => {
  if (err) console.log(err)
  console.log('Server running on http://127.0.0.1:3000')
})
