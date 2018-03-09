var express = require('express')
var app = express()
var http = require('http').Server(app)
var io = require('socket.io')(http)

var yahooFinance = require('yahoo-finance')

var path = process.cwd()
var stocksList = [{code: 'fb'}, {code: 'nflx'}]

const getStock = (symbol, from, to) => {
  return new Promise ( (resolve, reject) => {
    yahooFinance.historical({
        symbol,
        from, //'2015-01-01'
        to, //'2015-01-01'
      }, (err, quotes) => {
        if (err) reject(err)
        quotes = quotes.map(quote => {
          var {date, close} = quote
          return {date, close}
        } )
        resolve({stock: quotes.reverse(), symbol})
      })
  })
}

const getFullName = ({stock, symbol}) => {
  return new Promise( (resolve, reject) => {
    yahooFinance.quote({
        symbol,
        modules: ['price']       // optional; default modules.
      }, (err, {price}) => {
        var {exchangeName, longName} = price
        resolve({stock, exchangeName, longName})
    })
  })
}

app.use('/client', express.static(path + '/client'))
app.use('/public', express.static(path + '/client/public'))

app.route('/')
  .get((req, res) => {
    res.sendFile(path + '/client/public/index.html')
  })

io.on('connection', function(socket){
//  console.log('a user connected')
  var from = new Date()
  var to = new Date()
  from.setFullYear(from.getFullYear() - 1)
  to.setDate(to.getDate() - 1)

//  socket.emit('stock period', {from, to})

  stocksList.forEach( ({code}) => {
    getStock(code, from, to)
      .then(getFullName)
      .then( ({stock, exchangeName, longName}) => {
        socket.emit('add stock', {stock, code, exchangeName, longName})
      })
      .catch( err => {
        socket.emit('message', {head: 'error', body: err})
      })
  })
/*
  socket.on('disconnect', () => {
    console.log('user disconnected')
  })
*/
  socket.on('get stock', ({code})=> {
    if (stocksList.indexOf(code) == -1) {
      getStock(code, from, to)
        .then(getFullName)
        .then( ({stock, exchangeName, longName}) => {
          if (stock.length == 0) {
            socket.emit('message', {head: 'message', body: 'This stock is no'})
          } else {
            stocksList.push({code})
            socket.emit('add stock', {stock, code, exchangeName, longName})
            socket.broadcast.emit('add stock', {stock, code, exchangeName, longName})
          }
        })
        .catch( (err) => {
          socket.emit('message', {head: 'error', body: err})
        })
    }
  })

  socket.on('delete stock', ({code}) => {
    var deleteCode = code

    stocksList = stocksList.filter( ({code}) => {
      return deleteCode != code
    })
    socket.broadcast.emit('delete stock', {code})
  })
})

var port = process.env.PORT || 8080
http.listen(port, () => {
  console.log(`Node.js is listening on port ${port}`)
})
