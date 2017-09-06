const cluster = require('cluster')
const num_cpus = process.env.PROCESS_CNT || require('os').cpus().length;
const express = require("express")
const Profile = require("./profile")
const app = express()

if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);

  for (let i = 0; i < num_cpus; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
  });
} else {
  app.get("/:screen_name", async function(req, res){
    // mini, normal, bigger, original
    let size = req.query.size || "original"
    let profile = await Profile.get(req.params.screen_name, size)
    res.redirect(profile)
  })

  app.listen(80, function () {
    console.log('Start Server')
  })
}
