/*
 * @Author: Hale
 * @Description: 全局配置文件
 * @Date: 2019-05-18
 * @LastEditTime: 2019-05-23
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
  wx: {
    appId: '',
    appSecret: '',
    loginUrl:
      'https://api.weixin.qq.com/sns/jscode2session?appid=%s&secret=%s&js_code=%s&grant_type=authorization_code'
  }
}
