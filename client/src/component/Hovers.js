import React, {Component} from 'react'
import { connect } from 'react-redux'
import * as d3 from 'd3'

import {setHoverDate, setTooltip} from '../actions'

class Hovers extends Component {
  constructor(props) {
    super(props)
    this.rectRefs = []
    this.mouseOverHundler = this.mouseOverHundler.bind(this)
  }


  mouseOverHundler(date, index) {
    return () => {
      this.props.setTooltip(true, this.rectRefs[index], date)
      this.props.setHoverDate(date)
    }
  }

  render() {
    var {width, height, domainX, stocks} = this.props
    var data = stocks.length ? stocks[0].stock : []

    data = data.filter( ({date}) => {
      return date.getTime() >= domainX[0].getTime() && date.getTime() <= domainX[1].getTime()
    })
    data = data.reverse()

    var len = data.length
    return (
      data.map( (stock, index) => {
        return <rect
          key = {stock.date}
          x = {index * (width / len)}
          y = {0}
          width = {width / len}
          height = {height}
          opacity = '0.1'
          onMouseOver = {this.mouseOverHundler(stock.date, index)}
          ref = {ref => this.rectRefs[index] = ref}
        />
      })
    )
  }
}

const mapStateToProps = ({displayPeriod, stocks}) => {
  return {domainX: [displayPeriod.from, displayPeriod.to], stocks: stocks}
}
export default connect(mapStateToProps, {setHoverDate, setTooltip})(Hovers)
