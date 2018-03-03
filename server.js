var express = require('express')
var yahooFinance = require('yahoo-finance');

var app = express()
var path = process.cwd()

app.use('/client', express.static(path + '/client'))
app.use('/public', express.static(path + '/client/public'))

app.route('/')
  .get((req, res) => {
    res.sendFile(path + '/client/public/index.html')
  })

app.route('/api/getStock/:code/:from/:to')
  .get((req, res) => {
    yahooFinance.historical({
      symbol: req.params.code,
      from: req.params.from, //'2015-01-01'
      to: req.params.to, //'2015-01-01'
      // period: 'd'  // 'd' (daily), 'w' (weekly), 'm' (monthly), 'v' (dividends only)
    }, (err, quotes) => {
      if (err) console.log(err)
      quotes = quotes.map(quote => {
        var {date, close} = quote
        return {date, close}
      } )
      res.json(quotes)
    });
  })

var port = process.env.PORT || 8080
app.listen(port, () => {
  console.log(`Node.js is listening on port ${port}`)
})
