import React, {Component} from 'react'
import { connect } from 'react-redux'
import {setDisplayPeriod} from '../actions'
import {ButtonToolbar, ToggleButton, ToggleButtonGroup} from 'react-bootstrap'

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
      <ButtonToolbar>
        <ToggleButtonGroup type="radio" name="options"  bsSize="small" defaultValue={1}>
          <ToggleButton onClick = { () => this.props.setDisplayPeriod(from, to)} value={1}>All</ToggleButton>
          <ToggleButton onClick = { () => this.props.setDisplayPeriod(from6Month, to)} value={2}>6 Month</ToggleButton>
          <ToggleButton onClick = { () => this.props.setDisplayPeriod(from3Month, to)} value={3}>3 Month</ToggleButton>
          <ToggleButton onClick = { () => this.props.setDisplayPeriod(fromMonth, to)} value={4}>Month</ToggleButton>
        </ToggleButtonGroup>
      </ButtonToolbar>
    )
  }
}

const mapStateToProps = ({stockPeriod}) => {
  return {stockPeriod};
}
export default connect(mapStateToProps, {setDisplayPeriod})(ControlDatePanel)
