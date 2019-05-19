/*
 * @Author: Hale
 * @Description: 程序主入口
 * @Date: 2019-05-17
 * @LastEditTime: 2019-05-19
 */
const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const InitManager = require('./core/init')
const catchError = require('./middlewares/exception')

const app = new Koa()

app.use(catchError)
app.use(bodyParser())
InitManager.initCore(app)

app.listen(3000, err => {
  if (err) console.log(err)
  console.log('Server running on http://127.0.0.1:3000')
})
