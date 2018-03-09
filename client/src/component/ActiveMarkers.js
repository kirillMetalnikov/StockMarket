import React, {Component} from 'react'
import { connect } from 'react-redux'
import * as d3 from 'd3'

class ActiveMarkers extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    var {width, height, domainX, displayStocks, domainY, activeDate} = this.props

    if (!activeDate) return null
    let color = d3.schemeCategory20

    var x = d3.scaleTime()
      .rangeRound([0, width])
      .domain(domainX)
    var y = d3.scaleLinear()
      .range([height, 0])
      .domain(domainY)
    //this.props.setTooltip(true, this.rectRefs[index], `huy: ${activeDate}`)
    return (
      <g>
        <line
          className = {'marker'}
          x1 = {x(activeDate)}
          y1 = {0}
          x2 = {x(activeDate)}
          y2 = {height}
          strokeWidth = {4}
          stroke = 'gray'
        />
        {displayStocks.map( ({stock, code}, index) => {
          var {close} = stock.find( ({date}) => {
            return date.getTime() == activeDate.getTime()
          })
          if (!close) return
          return (
            <circle key = {index}
              key = {code}
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

const mapStateToProps = ({stock}) => {
  var {displayPeriod, priceDomain, displayStocks} = stock
  return {displayStocks, domainX: [displayPeriod.from, displayPeriod.to], domainY: [priceDomain.from, priceDomain.to]}
}
export default connect(mapStateToProps)(ActiveMarkers)
