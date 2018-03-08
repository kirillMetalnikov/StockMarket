import React, {Component} from 'react'
import { connect } from 'react-redux'
import * as d3 from 'd3'

import {setDisplayPeriod} from '../actions'

class Brush extends Component {
  constructor(props) {
    super(props)
    var {height, width, domainX, brushFrom, brushTo} = this.props
    this.brushRef = {}
    this.makeScale = this.makeScale.bind(this)
    this.makeBrush = this.makeBrush.bind(this)
    this.brushed = this.brushed.bind(this)
  }

  makeScale(width) {
    this.x = d3.scaleTime().range([0, width])
  }

  makeBrush(width, height, brushFrom, brushTo) {
    this.brush = d3.brushX()
        .extent([[0, 0], [width, height]])
        .on("end", this.brushed)

    var startX = this.x(brushFrom)
    var endX = this.x(brushTo)

    var gBrush = d3.select(this.brushRef)
    gBrush
      .call(this.brush)
      .call(this.brush.move, [startX, endX])
  }

  brushed() {
    var area = d3.event.selection.map( xN => this.x.invert(Number(xN)))
    this.props.setDisplayPeriod(area[0], area[1])
  }

  shouldComponentUpdate() {
    return false
  }

  componentWillReceiveProps(nextProps) {
    var {brushFrom, brushTo, domainX, width, height} = nextProps

    if( width != this.props.width) {
      this.makeScale(width)
      this.x.domain(domainX)
      this.makeBrush(width, height, brushFrom, brushTo)
    }

    if (brushFrom.valueOf() != this.props.brushFrom.valueOf() || brushTo.valueOf() != this.props.brushTo.valueOf()) {
      this.x.domain(domainX)
      this.makeBrush(width, height, brushFrom, brushTo)
    }
  }

  componentDidMount() {
    var {width, height, brushFrom, brushTo, domainX} = this.props
    this.makeScale(width)
    this.x.domain(domainX)

    this.makeBrush(width, height, brushFrom, brushTo)
  }

  render() {
    return (
      <g>
        <g className = 'brush' ref={ ref => this.brushRef = ref}>
        </g>
      </g>
    )
  }
}

const mapStateToProps = ({stock}) => {
  var {stockPeriod, displayPeriod} = stock
  return {domainX: [stockPeriod.from, stockPeriod.to], brushFrom: displayPeriod.from, brushTo: displayPeriod.to}
}

export default connect(mapStateToProps, {setDisplayPeriod})(Brush)
