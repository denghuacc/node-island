/*
 * @Author: Hale
 * @Description: Art Mixin
 * @Date: 2019-05-23
 * @LastEditTime: 2019-05-23
 */
const { Movie, Sentence, Music } = require('./classic')

class Art {
  static async getData(art_id, type) {
    let art = null

    const finder = {
      where: {
        id: art_id
      }
    }

    switch (type) {
      case 100:
        art = await Movie.findOne(finder)
        break
      case 200:
        art = await Music.findOne(finder)
        break
      case 300:
        art = await Sentence.findOne(finder)
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
