/*
 * @Author: Hale
 * @Description: 初始化基类
 * @Date: 2019-05-17
 * @LastEditTime: 2019-05-17
 */
const requireDirectory = require('require-directory')
const Router = require('koa-router')

class InitManager {
  // 初始化项目
  static initCore(app) {
    InitManager.app = app
    InitManager.initLoadRouters()
  }

  // 初始化路由
  static initLoadRouters() {
    // 注册路由
    const whenLoadModule = router => {
      if (router instanceof Router) {
        InitManager.app.use(router.routes()).use(router.allowedMethods())
      }
    }

    const apiDirectory = `${process.cwd()}/app/api` // api 目录绝对路径

    // 导入路由
    requireDirectory(module, apiDirectory, {
      visit: whenLoadModule
    })
  }
}

module.exports = InitManager
