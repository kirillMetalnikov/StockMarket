import React, {Component} from 'react'
import { connect } from 'react-redux'
import {setDisplayPeriod} from '../actions'
import {ButtonGroup, Button} from 'react-bootstrap'

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
      <ButtonGroup>
        <Button onClick = { () => this.props.setDisplayPeriod(from, to)}>All</Button>
        <Button onClick = { () => this.props.setDisplayPeriod(from6Month, to)}>6 Month</Button>
        <Button onClick = { () => this.props.setDisplayPeriod(from3Month, to)}>3 Month</Button>
        <Button onClick = { () => this.props.setDisplayPeriod(fromMonth, to)}>Month</Button>
      </ButtonGroup>
    )
  }
}

const mapStateToProps = ({stockPeriod}) => {
  return {stockPeriod};
}
export default connect(mapStateToProps, {setDisplayPeriod})(ControlDatePanel)
