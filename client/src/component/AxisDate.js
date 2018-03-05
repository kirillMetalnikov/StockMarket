import React, {Component} from 'react'
import * as d3 from 'd3'

class AxisDate extends Component {
  constructor(props) {
    super(props)
    var {range, domain} = this.props
    this.axisRef = {}
    this.x = d3.scaleTime().range(range)
    this.axis = d3.axisBottom(this.x)
      .tickFormat(d3.timeFormat("%b %d"))
      .ticks(5)
  }

  shouldComponentUpdate() {
    return false
  }

  componentWillReceiveProps(nextProps) {
    var {domain} = nextProps
    if (domain.valueOf() == this.props.domain.valueOf() && range.valueOf() == this.props.brange.valueOf()) return

    this.x.domain(domain)

    var gAxis = d3.select(this.axisRef)
    gAxis
      .call(this.axis.bind(this))
  }

  componentDidMount() {
    var {domain} = this.props
    this.x.domain(domain)

    var gAxis = d3.select(this.axisRef)
    gAxis
      .call(this.axis.bind(this))
  }

  render() {
    return (
      <g className = 'axis' ref={ ref => this.axisRef = ref}>
      </g>
    )
  }
}

export default AxisDate
