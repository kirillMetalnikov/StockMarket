import React, {Component} from 'react'
import * as d3 from 'd3'


class LineChart extends Component {
  constructor(props) {
    super(props)
    var {width, height, data, domainX, domainY} = this.props

//    var parseTime = d3.timeParse("%Y-%m-%d")
//    domainX[0] = parseTime(domainX[0])
//    domainX[1] = parseTime(domainX[1])

    var x = d3.scaleTime()
      .rangeRound([0, width])
      .domain(domainX)
    var y = d3.scaleLinear()
      .rangeRound([height, 0])
      .domain(domainY)

/*    var line = d3.line()
      .x(d => x(parseTime(d.date)))
      .y(d => y(+d.close))
*/
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
