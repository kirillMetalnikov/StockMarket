import React, {Component} from 'react'
import { connect } from 'react-redux'
import * as d3 from 'd3'

class ActiveMarkers extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    var {width, height, data, domainX, domainY, activeDate} = this.props
    if (!activeDate) {
      return null
    }

    let color = d3.schemeCategory20

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
      <g>
        <line
          x1 = {x(activeDate)}
          y1 = {0}
          x2 = {x(activeDate)}
          y2 = {height}
          strokeWidth = {2}
          stroke = 'gray'
          ref = {ref => this.rectRefs = ref}
        />
        {data.map( (stock, index) => {
          var {close} = stock.stock.filter( ({date, close}) => {
            return date.getTime() == activeDate.getTime()
          })[0]

          return (
            <circle key = {index}
              key = {stock.code}
              r = {3}
              cx = {x(activeDate)}
              cy = {y(+close)}
              fill = {color[index]}
            />
          )
        })}
      </g>
    )
  }
}

const mapStateToProps = ({activeDate, stocks, displayPeriod, priceDomain}) => {
  return {activeDate, data: stocks, domainX: [displayPeriod.from, displayPeriod.to], domainY: [priceDomain.from, priceDomain.to]}
}
export default connect(mapStateToProps)(ActiveMarkers)
