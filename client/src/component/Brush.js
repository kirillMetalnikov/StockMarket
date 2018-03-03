import React, {Component} from 'react'
import * as d3 from 'd3'

class Brush extends Component {
  constructor(props) {
    super(props)
    var {height, width, domainX, startDate, endDate} = this.props
    this.brushRef = {}
    this.x = d3.scaleTime().range([0, width]).domain(domainX)
    this.brush = d3.brushX()
        .extent([[0, 0], [width, height]])
        .on("end", this.brushed.bind(this))

  }

  brushed() {
  //  console.log(this.brush.extent() ,d3.event.selection, d3.event.selection.map( xN => this.x.invert(Number(xN))))
  }

  shouldComponentUpdate() {
    return false
  }

  componentWillReceiveProps(nextProps) {
    var startX = Math.round(this.x(nextProps.startDate))
    var endX = Math.round(this.x(nextProps.endDate))
    var gBrush = d3.select(this.brushRef)
    gBrush
      .call(this.brush.move, [startX, endX])
  }

  componentDidMount() {
    var {startDate, endDate} = this.props
    var startX = startDate ? this.x(startDate) : 0
    var endX = endDate ? this.x(endDate) : this.props.width

    var gBrush = d3.select(this.brushRef)
    gBrush
      .call(this.brush)
      .call(this.brush.move, [startX, endX])
  }

  render() {
    return (
      <g className = 'brush' ref={ ref => this.brushRef = ref}>
      </g>
    )
  }
}

export default Brush
