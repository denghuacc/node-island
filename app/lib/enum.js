/*
 * @Author: Hale
 * @Description: 模拟枚举
 * @Date: 2019-05-19
 * @LastEditTime: 2019-06-04
 */
const LoginType = {
  USER_MINI_PROGRAM: 100,
  USER_EMAIL: 101,
  USER_MOBILE: 102,
  ADMIN_EMAIL: 200,
  isThisType
}

const ArtType = {
  MOVIE: 100,
  MUSIC: 200,
  SENTENCE: 300,
  BOOK: 400,
  isThisType
}

function isThisType(val) {
  const arrType = Object.values(this)
  return arrType.includes(val)
}

module.exports = { LoginType, ArtType }
