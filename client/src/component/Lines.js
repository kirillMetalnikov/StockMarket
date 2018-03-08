import React, {Component} from 'react'
import { connect } from 'react-redux'
import * as d3 from 'd3'

import LineChart from './LineChart'

class Lines extends Component {

  render() {
    var {width, height, domainX, domainY, stocks, filtered, activeCode} = this.props
  //  console.log(stocks)
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

}

const mapStateToProps = ({stock}) => {
  var {priceDomain, stocks} = stock
  return {domainY: [priceDomain.from, priceDomain.to], stocks}
}

export default connect(mapStateToProps)(Lines)
