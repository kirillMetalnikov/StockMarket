import React, {Component} from 'react'
import { connect } from 'react-redux'
import * as d3 from 'd3'

import Brush from './Brush'
import LineChart from './LineChart'
import AxisDate from './AxisDate'
import AxisBrush from './AxisBrush'
import AxisPrice from './AxisPrice'
import {setDisplayPeriod} from '../actions'

class Chart extends Component {
  constructor(props) {
    super(props)
  }

  renderLines(width, height, domainX, domainY, stocks, filtered) {
    if (!stocks) return ''
    let color = d3.schemeCategory20
    return stocks.map( (stock, index) => {
      var data = stock.stock
      if (filtered) {
        data = data.filter( ({date}) => {
          return date.getTime() >= domainX[0].getTime() && date.getTime() <= domainX[1].getTime()
        })
      }
      return <LineChart key = {stock.code} width = {width} height={height} domainX = {domainX} domainY = {domainY} data = {data} color= {color[index]}/>
    })
  }

  render() {
    var { width, height, stocks, displayPeriod, stockPeriod, priceDomain} = this.props
    var margin = 50
    width = width - 2 * margin
    height = height - 2 *margin
    return (
      <div>
      <svg width = {width + 2 * margin} height = {height + 2 * margin}>
        <g transform = {`translate(${margin}, ${margin})`}>
          {this.renderLines(width, height - 100, [displayPeriod.from, displayPeriod.to], [priceDomain.from, priceDomain.to], stocks, true )}
          <g  transform = {`translate(0, ${height - 100})`}>
            <AxisDate domain = {[displayPeriod.from, displayPeriod.to]} range = {[0, width]}/>
          </g>

          <AxisPrice domain = {[priceDomain.from, priceDomain.to]} range = {[height - 100, 0]}/>
          <g transform = {`translate(0, ${height - 70})`}>
            {this.renderLines(width, 50, [stockPeriod.from, stockPeriod.to], [priceDomain.from, priceDomain.to], stocks, false )}
            <Brush
              width = {width}
              height={50}
              domainX = {[stockPeriod.from, stockPeriod.to]}
              brushFrom = {displayPeriod.from}
              brushTo = {displayPeriod.to}
              onChangeArea = {this.props.setDisplayPeriod.bind(this)}
            />
            <AxisBrush domain = {[stockPeriod.from, stockPeriod.to]} range = {[0, width]}/>
          </g>
        </g>
      </svg>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return state
}
export default connect(mapStateToProps, {setDisplayPeriod})(Chart)
