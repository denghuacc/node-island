/*
 * @Author: Hale
 * @Description: Art Mixin
 * @Date: 2019-05-23
 * @LastEditTime: 2019-05-29
 */
const { Op } = require('sequelize')
const { Movie, Sentence, Music } = require('./classic')
const { flatten } = require('lodash')
const { NotFound } = require('../../core/http-exception')

class Art {
  constructor(art_id, type) {
    this.art_id = art_id
    this.type = type
  }

  async getDetail(uid) {
    const { Favor } = require('./favor') // 不要放在文件头部，避免循环加载
    const art = await this.getData(this.art_id, this.type)
    if (!art) {
      throw new NotFound()
    }
    const isLike = await Favor.isUserLikeIt(this.art_id, this.type, uid)
    return {
      art,
      like_statue: isLike
    }
  }

  static async getList(artInfoList) {
    const artInfoObj = {
      100: [],
      200: [],
      300: []
    }

    for (let artInfo of artInfoList) {
      artInfoObj[artInfo.type].push(artInfo.art_id)
    }

    const arts = []

    for (let key in artInfoObj) {
      const ids = artInfoObj[key]
      if (ids.length === 0) {
        continue
      }
      key = parseInt(key)
      arts.push(await Art._getListByType(ids, key))
    }

    return flatten(arts)
  }

  // 根据类型查询
  static async _getListByType(ids, type) {
    let arts = []
    const finder = {
      where: {
        id: {
          [Op.in]: ids
        }
      }
    }

    const scope = 'bh'

    switch (type) {
      case 100:
        arts = await Movie.scope(scope).findOne(finder)
        break
      case 200:
        arts = await Music.scope(scope).findOne(finder)
        break
      case 300:
        arts = await Sentence.scope(scope).findOne(finder)
        break
      case 400:
        break
      default:
        break
    }

    return arts
  }

  async getData(useScope = true) {
    let art = null

    const finder = {
      where: {
        id: this.art_id
      }
    }

    const scope = useScope ? 'bh' : null
    switch (this.type) {
      case 100:
        art = await Movie.scope(scope).findOne(finder)
        break
      case 200:
        art = await Music.scope(scope).findOne(finder)
        break
      case 300:
        art = await Sentence.scope(scope).findOne(finder)
        break
      case 400:
        break
      default:
        break
    }

    return art
  }
}

module.exports = { Art }
