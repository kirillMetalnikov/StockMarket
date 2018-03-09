import React, {Component} from 'react'
import { connect } from 'react-redux'
import * as d3 from 'd3'

import {setHoverDate, setTooltip} from '../actions'

import ActiveMarkers from './ActiveMarkers'

class Hovers extends Component {
  constructor(props) {
    super(props)
    this.rectRefs = []
    this.mouseOverHundler = this.mouseOverHundler.bind(this)
    this.mouseOutHundler = this.mouseOutHundler.bind(this)
  }

  mouseOutHundler() {
    return () => {
      this.props.setTooltip(false, null, null)
      this.props.setHoverDate(null)
    }
  }

  getTooltipData(activeDate) {
    var {width, height, domainX, domainY, displayStocks} = this.props
    let color = d3.schemeCategory20

    var x = d3.scaleTime()
      .rangeRound([0, width])
      .domain(domainX)
    var y = d3.scaleLinear()
      .range([height, 0])
      .domain(domainY)

    return (
      displayStocks.map( ({stock, code}, index) => {
        var {close} = stock.find( ({date}) => {
          return date.getTime() == activeDate.getTime()
        })
        return {code, close, color: color[index]}
      })
    )
  }

  mouseOverHundler(date, index) {
    return () => {
      this.props.setTooltip(true, this.rectRefs[index], this.getTooltipData(date))
      this.props.setHoverDate(date)
    }
  }

  render() {
    var {width, height, domainX, displayStocks, activeDate} = this.props
    var data = displayStocks.length ? displayStocks[0].stock : []

    var x = d3.scaleTime()
      .range([0, width])
      .domain(domainX)

    var len = data.length

    return (
      data.map( (stock, index) => {
        return (
          <g  key = {stock.date}>
            {(activeDate && (stock.date.getTime() == activeDate.getTime()))
              ? <ActiveMarkers width = {width} height = {height} activeDate = {stock.date}/>
              : null
            }
            <rect
              x = {x(stock.date)}
              y = {0}
              width = {width}
              height = {height}
              opacity = '0.0'
              onMouseOver = {this.mouseOverHundler(stock.date, index)}
              onMouseOut = {this.mouseOutHundler(stock.date, index)}
              ref = {ref => this.rectRefs[index] = ref}
            />
          </g>
        )
      })
    )
  }
}

const mapStateToProps = ({stock, activeDate}) => {
  var {displayPeriod, displayStocks, priceDomain} = stock
  return {domainX: [displayPeriod.from, displayPeriod.to], displayStocks,  domainY: [priceDomain.from, priceDomain.to], activeDate}
}
export default connect(mapStateToProps, {setHoverDate, setTooltip})(Hovers)
