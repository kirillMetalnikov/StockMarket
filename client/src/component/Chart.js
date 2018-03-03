import React, {Component} from 'react'
import { connect } from 'react-redux'
import * as d3 from 'd3'

import Brush from './Brush'
import data from './test_data'
import LineChart from './LineChart'
import {setDisplayPeriod} from '../actions'

class Chart extends Component {
  constructor(props) {
    super(props)
//    var parseTime = d3.timeParse("%Y-%m-%d")
//    this.state = {displayFrom: this.props.displayPeriod.from, displayTo: this.props.displayPeriod.to}
  }

  renderLines(width, height, domainX, domainY, stocks) {
    if (!stocks) return ''
    let color = d3.schemeCategory20

    return stocks.map( (stock, index) => {
      return <LineChart key = {stock.code} width = {width} height={height} domainX = {domainX} domainY = {domainY} data = {stock} color= {color[index]}/>
    })
  }

  render() {
    var { width, height, from, to, stocks, displayPeriod} = this.props
//    var parseTime = d3.timeParse("%Y-%m-%d")
    return (
      <svg width = {width} height = {height}>
        {this.renderLines(width, height - 100, [this.props.displayPeriod.from, this.props.displayPeriod.to], [0, 300], stocks )}
        <g transform = {`translate(0, ${height - 70})`}>
          {this.renderLines(width, 50, [from, to], [0, 300], stocks )}
          <Brush
            width = {width}
            height={50}
            domainX = {[from, to]}
            brushFrom = {displayPeriod.from}
            brushTo = {displayPeriod.to}
            onChangeArea = {this.props.setDisplayPeriod.bind(this)}
          />
        </g>
      </svg>
    )
  }
}

const mapStateToProps = ({stocks, from, to, displayPeriod}) => {
  return {stocks, from, to, displayPeriod};
}
export default connect(mapStateToProps, {setDisplayPeriod})(Chart)
