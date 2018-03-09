import React, {Component} from 'react'
import { connect } from 'react-redux'
import * as d3 from 'd3'
import {Overlay, Tooltip} from 'react-bootstrap'

import Brush from './Brush'
import Lines from './Lines'
import AxisDate from './AxisDate'
import AxisBrush from './AxisBrush'
import AxisPrice from './AxisPrice'
import Hovers from './Hovers'
import {setHoverDate, setTooltip} from '../actions'

class Chart extends Component {
  constructor(props) {
    super(props)
  }

  renderTooltip(data){
    return data.map(({code, close, color}) => {
      return (
        <span key = {code} style = {{color}}>{code}: {close}<br/></span>
      )
    })
  }

  render() {
    var { width, height, stock, priceDomain, activeCode, tooltip, activeDate} = this.props
    var {displayPeriod, priceDomain, stockPeriod, displayStocks, stocks} = stock

    var marginV = 30
    var marginH = 50
    width = width - 2 * marginH
    height = height - 2 * marginV

    return (
      <div style = {{position: 'relative'}}>
        <svg width = {width + 2 * marginH} height = {height + 2 * marginV}>
          <g  transform = {`translate(${marginH}, ${marginV})`}>
            <g>
              <Lines
                width = {width}
                height = {height - 50}
                domainX = {[displayPeriod.from, displayPeriod.to]}
                stocks = {displayStocks}
                activeCode ={activeCode}
              />

              <Hovers width = {width} height ={height - 50}/>
            </g>
            <g  transform = {`translate(0, ${height - 50})`}>
              <AxisDate domain = {[displayPeriod.from, displayPeriod.to]} range = {[0, width]}/>
            </g>
            <AxisPrice domain = {[priceDomain.from, priceDomain.to]} range = {[height - 50, 0]} width = {width}/>
            <g transform = {`translate(0, ${height - 10})`}>
              <Lines
                width = {width}
                height = {30}
                domainX = {[stockPeriod.from, stockPeriod.to]}
                stocks = {stocks}
                activeCode = {-1}
              />
              <AxisBrush domain = {[stockPeriod.from, stockPeriod.to]} range = {[0, width]}/>
              <Brush width = {width} height={30} />
            </g>
          </g>
        </svg>
        {
          tooltip.target ?
            (<Overlay container = {this} placement="left" show = {tooltip.show} target = {tooltip.target}>
              <Tooltip id = "tooltip" className="in" style = { {pointerEvents: 'none'}}><h6>{activeDate.toString()}</h6>{this.renderTooltip(tooltip.data)}</Tooltip>
            </Overlay>):
            null
        }

      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return state
}
export default connect(mapStateToProps, {setHoverDate, setTooltip})(Chart)
