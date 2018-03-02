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
        .on("brush end", () => console.log(d3.event.selection.map( xN => this.x.invert(xN))))

    this.state = {startX: this.x(startDate), endX: this.x(endDate)}
  }

  shouldComponentUpdate() {
    return false
  }

  componentDidMount() {
    console.log(this.state)
    var {startX, endX} = this.state
    var gBrush = d3.select(this.brushRef)
    gBrush
      .call(this.brush)
      .call(this.brush.move, [Math.round(startX), Math.round(endX)])
  }

  render() {
    return (
      <g className = 'brush' ref={ ref => this.brushRef = ref}>
      </g>
    )
  }
}

export default Brush
