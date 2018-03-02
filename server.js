var express = require('express')

var app = express()
var path = process.cwd()

app.use('/client', express.static(path + '/client'))
app.use('/public', express.static(path + '/client/public'))

app.route('/')
  .get((req, res) => {
    res.sendFile(path + '/client/public/index.html')
  })

var port = process.env.PORT || 8080
app.listen(port, () => {
  console.log(`Node.js is listening on port ${port}`)
})
