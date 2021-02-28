const { setEnvironment } = require('./config/env.js')
const { registerRoutes } = require('./routes.js')
const { connectToDB } = require('./config/db.js')
const express = require('express')
const app = express()
const port = 3000

setEnvironment(app)
connectToDB()
registerRoutes(app)

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})