import React, {Component} from 'react'
import * as d3 from 'd3'

class LineChart extends Component {
  constructor(props) {
    super(props)

  }

  render() {
    var {width, height, data, domainX, domainY, color} = this.props
    var x = d3.scaleTime()
      .rangeRound([0, width])
      .domain(domainX)
    var y = d3.scaleLinear()
      .range([height, 0])
      .domain(domainY)

    var line = d3.line()
        .x(d => x(d.date))
        .y(d => y(+d.close))
    this.path = line(data || [])

    return (
      <path d = {this.path} stroke = {color} fill = 'none'/>
    )
  }
}

export default LineChart
