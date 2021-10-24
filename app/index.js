const express = require("express")
const app = express()

// token run ...
app.use("/token", require("./router-token"))

// session run ...
// app.use("/session", require("./router-session"))


module.exports = app