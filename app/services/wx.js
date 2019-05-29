/*
 * @Author: Hale
 * @Description: 微信相关
 * @Date: 2019-05-19
 * @LastEditTime: 2019-05-29
 */
const util = require('util')
const axios = require('axios')
const { User } = require('../models/user')
const { generateToken } = require('../../core/util')
const { Auth } = require('../../middlewares/auth')
const { AuthFailed } = require('../../core/http-exception')
const { appId, appSecret, loginUrl } = require('../../config').wx

class WXManger {
  static async codeToToken(code) {
    const url = util.format(loginUrl, appId, appSecret, code)

    const result = await axios.get(url)

    if (result.status !== 200) {
      throw new AuthFailed('openid获取失败')
    }

    const { errcode, openid, errmsg } = result.data

    if (errcode) {
      throw new AuthFailed(`openid获取失败, errmsg: ${errmsg}`)
    }

    let user = await User.getUserByOpenid(openid)

    if (!user) {
      user = await User.registerByOpenid(openid)
    }

    return generateToken(user.id, Auth.USER)
  }
}

module.exports = { WXManger }
