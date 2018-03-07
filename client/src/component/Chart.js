import React, {Component} from 'react'
import { connect } from 'react-redux'
import * as d3 from 'd3'

import Brush from './Brush'
import LineChart from './LineChart'
import AxisDate from './AxisDate'
import AxisBrush from './AxisBrush'
import AxisPrice from './AxisPrice'
import ActiveMarkers from './ActiveMarkers'
import {setDisplayPeriod, setHoverDate} from '../actions'

class Chart extends Component {
  constructor(props) {
    super(props)
    this.renderHovers = this.renderHovers.bind(this)
    this.mouseOverHundler = this.mouseOverHundler.bind(this)
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

  mouseOverHundler(date) {
    return () => this.props.setHoverDate(date)
  }
  
  renderHovers(width, height, domainX, stocks) {
    
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
          onMouseOver = {this.mouseOverHundler(stock.date)}
        />
      })
      
    )
  }
  
  componentDidMount() {
  /*  d3.select(this.displayRef)
      .on('mousemove', () => {
      console.log(d3.event.clientX, d3.event.clientY)
    })
    */
  }
  
  render() {
    var { width, height, stocks, displayPeriod, stockPeriod, priceDomain, activeCode, activeDate} = this.props
    var marginV = 30
    var marginH = 50
    width = width - 2 * marginH
    height = height - 2 * marginV
    
    return (
      <div>
      <svg width = {width + 2 * marginH} height = {height + 2 * marginV}>
        <g  transform = {`translate(${marginH}, ${marginV})`}>
          <g>
            {this.renderLines(width, height - 50, [displayPeriod.from, displayPeriod.to], [priceDomain.from, priceDomain.to], stocks, true, activeCode )}
            <ActiveMarkers
              activeDate = {activeDate}
              width = {width}
              height = {height - 50}
              data = {stocks}
              domainX = {[displayPeriod.from, displayPeriod.to]}
              domainY = {[priceDomain.from, priceDomain.to]}
            />
            
            {this.renderHovers(width, height - 50, [displayPeriod.from, displayPeriod.to], stocks)}
          </g>
          <g  transform = {`translate(0, ${height - 50})`}>
            <AxisDate domain = {[displayPeriod.from, displayPeriod.to]} range = {[0, width]}/>
          </g>
          <AxisPrice domain = {[priceDomain.from, priceDomain.to]} range = {[height - 50, 0]} width = {width}/>
          <g transform = {`translate(0, ${height - 10})`}>
            {this.renderLines(width, 30, [stockPeriod.from, stockPeriod.to], [priceDomain.from, priceDomain.to], stocks, false, -1 )}
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
export default connect(mapStateToProps, {setDisplayPeriod, setHoverDate})(Chart)
