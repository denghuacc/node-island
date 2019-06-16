/*
 * @Author: Hale
 * @Description: 全局配置文件
 * @Date: 2019-05-18
 * @LastEditTime: 2019/06/16
 */
module.exports = {
  env: 'development',
  database: {
    dbName: 'island',
    host: '127.0.0.1',
    port: 3306,
    user: 'root',
    password: 'password'
  },
  security: {
    secretKey: '@2Wd%e9Cd3s.P,&1!',
    expiresIn: 60 * 60 * 24 * 7
  },
  // set your config
  wx: {
    appId: 'your appId',
    appSecret: 'your appSecret',
    loginUrl:
      'https://api.weixin.qq.com/sns/jscode2session?appid=%s&secret=%s&js_code=%s&grant_type=authorization_code'
  },
  yushu: {
    detailUrl: 'http://t.yushu.im/v2/book/id/%s',
    keywordUrl:
      'http://t.yushu.im/v2/book/search?q=%s&count=%s&start=%s&summary=%s'
  },
  host: 'http://127.0.0.1:3000/'
}
