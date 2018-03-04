import React, {Component} from 'react'
import { connect } from 'react-redux'
import * as d3 from 'd3'

import Brush from './Brush'
import LineChart from './LineChart'
import {setDisplayPeriod} from '../actions'

class Chart extends Component {
  constructor(props) {
    super(props)
  }

  renderLines(width, height, domainX, domainY, stocks) {
    if (!stocks) return ''
    let color = d3.schemeCategory20

    return stocks.map( (stock, index) => {
      return <LineChart key = {stock.code} width = {width} height={height} domainX = {domainX} domainY = {domainY} data = {stock} color= {color[index]}/>
    })
  }

  render() {
    var { width, height, from, to, stocks, displayPeriod, stockPeriod} = this.props
    console.log(stockPeriod)
    return (
      <svg width = {width} height = {height}>
        {this.renderLines(width, height - 100, [displayPeriod.from, displayPeriod.to], [0, 300], stocks )}
        <g transform = {`translate(0, ${height - 70})`}>
          {this.renderLines(width, 50, [stockPeriod.from, stockPeriod.to], [0, 300], stocks )}
          <Brush
            width = {width}
            height={50}
            domainX = {[stockPeriod.from, stockPeriod.to]}
            brushFrom = {displayPeriod.from}
            brushTo = {displayPeriod.to}
            onChangeArea = {this.props.setDisplayPeriod.bind(this)}
          />
        </g>
      </svg>
    )
  }
}

const mapStateToProps = (state) => {
  return state
}
export default connect(mapStateToProps, {setDisplayPeriod})(Chart)
