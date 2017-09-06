const request = require("request")
const bluebird = require("bluebird")
const redis = require("redis"),
  client = bluebird.promisifyAll(redis.createClient("redis://redis"))

const profile  = {
  get_profile: function(screen_name, size) {
    return new Promise((resolve, reject) => {
      request.get(`https://twitter.com/${screen_name}/profile_image?size=${size}`, function(err, res, body){
        if(err) return reject(err)
        if(res.statusCode == 200)
        {
          resolve(res.request.uri.href)
        }
      }) 
    })
  },
  get: async function(screen_name, size) {
    let key = `${screen_name}:${size}`
    let exists = await client.existsAsync(key)
    let profile_path
    if(exists) {
      profile_path = await client.getAsync(key)
    }else{
      profile_path = await this.get_profile(screen_name, size)
      await client.setexAsync(key, 300, profile_path)
    }
    return profile_path
  }
}
module.exports = profile
