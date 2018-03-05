import React, {Component} from 'react'
import * as d3 from 'd3'

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
        .on("end", this.brushed.bind(this))

    var startX = this.x(brushFrom)
    var endX = this.x(brushTo)

    var gBrush = d3.select(this.brushRef)
    gBrush
      .call(this.brush)
      .call(this.brush.move, [startX, endX])
  }

  brushed() {
    var area = d3.event.selection.map( xN => this.x.invert(Number(xN)))
    this.props.onChangeArea(area[0], area[1])
  }

  shouldComponentUpdate() {
    return false
  }

  componentWillReceiveProps(nextProps) {
    var {brushFrom, brushTo, domainX, width, height} = nextProps

    if( width != this.props.width) {
      this.makeScale(width)
      this.makeBrush(width, height, brushFrom, brushTo)
    }

    if (brushFrom.valueOf() == this.props.brushFrom.valueOf() && brushTo.valueOf() == this.props.brushTo.valueOf()) return

    this.x.domain(domainX)

    var startX = this.x(brushFrom)
    var endX = this.x(brushTo)
    var gBrush = d3.select(this.brushRef)
    gBrush
      .call(this.brush.move, [startX, endX])
  }

  componentDidMount() {
    var {width, height, brushFrom, brushTo} = this.props
    this.makeScale(width)
    this.makeBrush(width, height, brushFrom, brushTo)

  }

  render() {
    return (
      <g className = 'brush' ref={ ref => this.brushRef = ref}>
      </g>
    )
  }
}

export default Brush
