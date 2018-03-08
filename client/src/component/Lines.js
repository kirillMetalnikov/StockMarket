import React, {Component} from 'react'
import { connect } from 'react-redux'
import * as d3 from 'd3'

import LineChart from './LineChart'

class Lines extends Component {

  render() {
    var {width, height, domainX, domainY, stocks, activeCode} = this.props
    if (!stocks) return ''
    let color = d3.schemeCategory20

    return stocks.map( (stock, index) => {
      let strokeWidth = stock.code == activeCode ? '4px' : '2px'
      var data = stock.stock
      return <LineChart key = {stock.code} width = {width} height={height} domainX = {domainX} domainY = {domainY} data = {data} color= {color[index]} strokeWidth = {strokeWidth}/>
    })
  }

}

const mapStateToProps = ({stock}) => {
  var {priceDomain} = stock
  return {domainY: [priceDomain.from, priceDomain.to]}
}

export default connect(mapStateToProps)(Lines)
