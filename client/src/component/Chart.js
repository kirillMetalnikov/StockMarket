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

  renderLines(width, height, domainX, domainY, stocks, filtered, activeCode) {
    if (!stocks) return ''
    let color = d3.schemeCategory20

    return stocks.map( (stock, index) => {
      let strokeWidth = stock.code == activeCode ? '3px' : '1px'
      var data = stock.stock
      if (filtered) {
        data = data.filter( ({date}) => {
          return date.getTime() >= domainX[0].getTime() && date.getTime() <= domainX[1].getTime()
        })
      }
      return <LineChart key = {stock.code} width = {width} height={height} domainX = {domainX} domainY = {domainY} data = {data} color= {color[index]} strokeWidth = {strokeWidth}/>
    })
  }

  render() {
    var { width, height, stocks, displayPeriod, stockPeriod, priceDomain, activeCode} = this.props
    var marginV = 20
    var marginH = 50
    width = width - 2 * marginV
    height = height - 2 *marginH
    return (
      <div>
      <svg width = {width + 2 * marginV} height = {height + 2 * marginH}>
        <g transform = {`translate(${marginH}, ${marginV})`}>
          {this.renderLines(width, height - 50, [displayPeriod.from, displayPeriod.to], [priceDomain.from, priceDomain.to], stocks, true, activeCode )}
          <g  transform = {`translate(0, ${height - 50})`}>
            <AxisDate domain = {[displayPeriod.from, displayPeriod.to]} range = {[0, width]}/>
          </g>

          <AxisPrice domain = {[priceDomain.from, priceDomain.to]} range = {[height - 50, 0]}/>
          <g transform = {`translate(0, ${height})`}>
            {this.renderLines(width, 30, [stockPeriod.from, stockPeriod.to], [priceDomain.from, priceDomain.to], stocks, false, activeCode )}
            <AxisBrush domain = {[stockPeriod.from, stockPeriod.to]} range = {[0, width]}/>
            <Brush
              width = {width}
              height={30}
              domainX = {[stockPeriod.from, stockPeriod.to]}
              brushFrom = {displayPeriod.from}
              brushTo = {displayPeriod.to}
              onChangeArea = {this.props.setDisplayPeriod.bind(this)}
            />

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
