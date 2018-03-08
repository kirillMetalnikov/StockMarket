import React, {Component} from 'react'
import { connect } from 'react-redux'
import * as d3 from 'd3'
import {Overlay, Tooltip} from 'react-bootstrap'

import Brush from './Brush'
import Lines from './Lines'
import AxisDate from './AxisDate'
import AxisBrush from './AxisBrush'
import AxisPrice from './AxisPrice'
import ActiveMarkers from './ActiveMarkers'
import Hovers from './Hovers'

class Chart extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    var { width, height, stock, priceDomain, activeCode, tooltip} = this.props
    var {displayPeriod, priceDomain, stockPeriod} = stock

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
                filtered = {true}
                activeCode ={activeCode}
              />
              <ActiveMarkers width = {width} height = {height - 50}/>
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
                filtered = {false}
                activeCode = {-1}
              />
              <AxisBrush domain = {[stockPeriod.from, stockPeriod.to]} range = {[0, width]}/>
              <Brush width = {width} height={30} />
            </g>
          </g>
        </svg>
        <Overlay container = {this} placement="right" show = {tooltip.show} target = {tooltip.target}>
          <Tooltip id = "tooltip" className="in" style = { {pointerEvents: 'none'} }>{tooltip.text}</Tooltip>
        </Overlay>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  console.log(state)
  return state
}
export default connect(mapStateToProps)(Chart)
