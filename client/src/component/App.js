import React, {Component} from 'react'

import Brush from './Brush'
import data from './test_data'
import LineChart from './LineChart'

import * as d3 from 'd3'

class App extends Component {
  render() {
    var parseTime = d3.timeParse("%Y-%m-%d")
    
    var stock = data["Time Series (Daily)"]
    var arr =[]
    for (let key in stock) {
      arr.push({date: parseTime(key), close: stock[key]["4. close"]})
    }
    
    return (
      <div>
        <h1>Header</h1>
        <h3>Linebar</h3>
        <svg width="960" height="500">
          <LineChart width = '900' height='50' domainX = {[parseTime('2017-10-09'), parseTime('2018-03-02')]} domainY = {[0, 100]} data = {arr}/>
          <Brush
            width = '900'
            height='50'
            domainX = {[parseTime('2017-10-09'), parseTime('2018-03-02')]}
            startDate = {parseTime('2017-12-31')}
            endDate = {parseTime('2018-02-10')}
          />
        </svg>
      </div>
    )
  }
}

export default App
