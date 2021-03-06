import React, {Component} from 'react'
import * as d3 from 'd3'

class AxisPrice extends Component {
  constructor(props) {
    super(props)
    var {range, domain, width} = this.props
    this.axisRef = {}
    this.x = d3.scaleTime().range(range)
    this.axis = d3.axisLeft(this.x)
      .tickFormat(d3.format(",.2r"))
      .ticks(5)
      .tickSize(-width)
  }

  shouldComponentUpdate() {
    return false
  }

  componentWillReceiveProps(nextProps) {
    var {domain, width} = nextProps
    if (domain.valueOf() == this.props.domain.valueOf() && range.valueOf() == this.props.brange.valueOf()) return

    this.x.domain(domain)

    var gAxis = d3.select(this.axisRef)
    gAxis
      .call(this.axis.tickSize(-width).bind(this))
  }

  componentDidMount() {
    var {domain, width} = this.props
    this.x.domain(domain)

    var gAxis = d3.select(this.axisRef)
    gAxis
      .call(this.axis.tickSize(-width).bind(this))
  }

  render() {
    return (
      <g className = 'axis-price' ref={ ref => this.axisRef = ref}>
      </g>
    )
  }
}

export default AxisPrice
