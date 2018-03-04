import React, {Component} from 'react'
import { connect } from 'react-redux'
import {setDisplayPeriod} from '../actions'

class ControlDatePanel extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    var {from, to} = this.props.stockPeriod
    var from6Month = new Date()
    from6Month.setMonth(from6Month.getMonth() - 6)

    var from3Month = new Date()
    from3Month.setMonth(from3Month.getMonth() - 3)

    var fromMonth = new Date()
    fromMonth.setMonth(fromMonth.getMonth() - 1)

    var fromWeek = new Date()
    fromWeek.setDate(fromWeek.getDate() - 7)

    return (
      <div>
        <h3>Control</h3>
        <button onClick = { () => this.props.setDisplayPeriod(from, to)}>All</button>
        <button onClick = { () => this.props.setDisplayPeriod(from6Month, to)}>6 Month</button>
        <button onClick = { () => this.props.setDisplayPeriod(from3Month, to)}>3 Month</button>
        <button onClick = { () => this.props.setDisplayPeriod(fromMonth, to)}>Month</button>
        <button onClick = { () => this.props.setDisplayPeriod(fromWeek, to)}>Week</button>
      </div>
    )
  }
}

const mapStateToProps = ({stockPeriod}) => {
  return {stockPeriod};
}
export default connect(mapStateToProps, {setDisplayPeriod})(ControlDatePanel)
