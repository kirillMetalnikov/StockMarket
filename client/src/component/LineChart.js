import React, {Component} from 'react'
import * as d3 from 'd3'

class LineChart extends Component {
  constructor(props) {
    super(props)
    var {width, height, data, domainX, domainY} = this.props

    var x = d3.scaleTime()
      .rangeRound([0, width])
      .domain(domainX)
    var y = d3.scaleLinear()
      .rangeRound([height, 0])
      .domain(domainY)

    var line = d3.line()
        .x(d => x(d.date))
        .y(d => y(+d.close))
    this.path = line(data)
  }

  render() {
    return (
      <path d = {this.path} stroke = 'blue' fill = 'none'/>
    )
  }
}

export default LineChart
