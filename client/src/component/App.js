import React, {Component} from 'react'
import { connect } from 'react-redux'

import Chart from './Chart'
import AddStockForm from './AddStockForm'
import ControlDatePanel from './ControlDatePanel'
import {getStock} from '../actions'


class App extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.getStock('ibm', this.props.from, this.props.to)
  }

  render() {
    return (
      <div>
        <h1>Header</h1>
        <ControlDatePanel />
        <Chart width={960} height={500}/>
        <AddStockForm />
      </div>
    )
  }
}


const mapStateToProps = ({stocks, from, to}) => {
  return {stocks, from, to};
}
export default connect(mapStateToProps, {getStock})(App)
