import React, {Component} from 'react'
import * as d3 from 'd3'

import Brush from './Brush'
import data from './test_data'
import LineChart from './LineChart'

class Chart extends Component {
  constructor(props) {
    super(props)
//    var parseTime = d3.timeParse("%Y-%m-%d")
    this.state = {startDate: this.parseTime('2017-10-09'), endDate: this.parseTime('2018-03-02')}
  }

  parseTime (date) {
    return d3.timeParse("%Y-%m-%d")(date)
  }

  changeArea(startDate, endDate) {
    this.setState({startDate, endDate})
  }

  render() {
    var { width, height} = this.props
//    var parseTime = d3.timeParse("%Y-%m-%d")

    var stock = data["Time Series (Daily)"]
    var arr =[]
    for (let key in stock) {
      arr.push({date: this.parseTime(key), close: stock[key]["4. close"]})
    }

    return (
      <svg width = {width} height = {height}>
        <LineChart width = {width} height={height - 100} domainX = {[this.state.startDate, this.state.endDate]} domainY = {[0, 100]} data = {arr}/>
        <g transform = {`translate(0, ${height - 70})`}>
          <LineChart width = {width} height={50} domainX = {[this.parseTime('2017-10-09'), this.parseTime('2018-03-02')]} domainY = {[0, 100]} data = {arr}/>
          <Brush
            width = {width}
            height={50}
            domainX = {[this.parseTime('2017-10-09'), this.parseTime('2018-03-02')]}
            startDate = {this.parseTime('2017-10-09')}
            endDate = {this.parseTime('2018-03-02')}
            onChangeArea = {this.changeArea.bind(this)}
          />
        </g>
      </svg>
    )
  }
}

export default Chart
