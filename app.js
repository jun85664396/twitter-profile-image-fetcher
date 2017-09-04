const request = require('request')

const express = require("express")
const app = express()

function get_profile(screen_name, size) {
  return new Promise((resolve, reject) => {
    request.get(`https://twitter.com/${screen_name}/profile_image?size=${size}`, function(err, res, body){
      if(err) return reject(err)
      if(res.statusCode == 200)
      {
        resolve(res.request.uri.href)
      }
    }) 
  })
}
app.get("/:screen_name", async function(req, res){
  // mini, normal, bigger, original
  let size = req.query.size || "original"
  let profile = await get_profile(req.params.screen_name, size)
  res.redirect(profile)
})

app.listen(80, function () {
  console.log('Start Server')
})
