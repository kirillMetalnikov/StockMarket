import React, {Component} from 'react'
import { connect } from 'react-redux'
import * as d3 from 'd3'

import {setHoverDate, setTooltip} from '../actions'

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

  mouseOverHundler(date, index) {
    return () => {
      this.props.setTooltip(true, this.rectRefs[index], date)
      this.props.setHoverDate(date)
    }
  }

  render() {
    var {width, height, domainX, displayStocks} = this.props
//    console.log(displayStocks)
    var data = displayStocks.length ? displayStocks[0].stock : []

    var x = d3.scaleTime()
      .range([0, width])
      .domain(domainX)

    var len = data.length
    return (
      data.map( (stock, index) => {
        return (
          <rect
          className = {'hover'}
            key = {stock.date}
            x = {x(stock.date)}
            y = {0}
            width = {width}
            height = {height}
            opacity = '0.0'
            onMouseOver = {this.mouseOverHundler(stock.date, index)}
            onMouseOut = {this.mouseOutHundler(stock.date, index)}
            ref = {ref => this.rectRefs[index] = ref}
          />
        )
      })
    )
  }
}

const mapStateToProps = ({stock}) => {
  var {displayPeriod, displayStocks} = stock
  return {domainX: [displayPeriod.from, displayPeriod.to], displayStocks}
}
export default connect(mapStateToProps, {setHoverDate, setTooltip})(Hovers)
