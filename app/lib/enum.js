/*
 * @Author: Hale
 * @Description: 模拟枚举
 * @Date: 2019-05-19
 * @LastEditTime: 2019-05-19
 */
const loginType = {
  USER_MINI_PROGRAM: 100,
  USER_EMAIL: 101,
  USER_MOBILE: 102,
  ADMIN_EMAIL: 200,
  isThisType
}

function isThisType(val) {
  const arrType = Object.values(loginType)
  return arrType.includes(val)
}

module.exports = { loginType }
