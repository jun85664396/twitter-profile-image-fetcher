const express = require("express")
const Profile = require("./profile")
const app = express()

app.get("/:screen_name", async function(req, res){
  // mini, normal, bigger, original
  let size = req.query.size || "original"
  let profile = await Profile.get(req.params.screen_name, size)
  res.redirect(profile)
})

app.listen(80, function () {
  console.log('Start Server')
})
