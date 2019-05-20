/*
 * @Author: Hale
 * @Description: Auth 身份验证相关
 * @Date: 2019-05-19
 * @LastEditTime: 2019-05-20
 */
const jwt = require('jsonwebtoken')
const basicAuth = require('basic-auth')
const { successResponse } = require('../app/lib/helper')
const { Forbidden } = require('../core/http-exception')

class Auth {
  constructor(level = 1) {
    // 权限等级
    this.level = level
    Auth.USER = 8
    Auth.ADMIN = 16
    Auth.SUPER_ADMIN = 32
  }

  get middleware() {
    return async (ctx, next) => {
      const userToken = basicAuth(ctx.req)

      let errMsg = 'token不合法'

      if (!userToken || !userToken.name) {
        throw new Forbidden(errMsg)
      }

      let decode
      try {
        const secretKey = global.config.security.secretKey
        decode = jwt.verify(userToken.name, secretKey)
      } catch (error) {
        if (error.name === 'TokenExpiredError') {
          errMsg = 'token已过期'
        }
        throw new Forbidden(errMsg)
      }

      const { uid, scope } = decode

      if (scope < this.level) {
        errMsg = '权限不足'
        throw new Forbidden(errMsg)
      }

      ctx.auth = { uid, scope }
      await next()
    }
  }

  static verifyToken(token) {
    try {
      jwt.verify(token, global.config.security.secretKey)
      return true
    } catch (error) {
      return false
    }
  }
}

module.exports = { Auth }
