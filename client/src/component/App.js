import React, {Component} from 'react'
import { connect } from 'react-redux'

import Chart from './Chart'
import {getStock} from '../actions'


class App extends Component {
  constructor(props) {
    super(props)
    this.from = new Date()
    this.from.setFullYear(this.from.getFullYear() - 3)
    this.to = new Date()
  }

  componentDidMount() {
    this.props.getStock('ibm', this.from, this.to)
  }

  render() {
    return (
      <div>
        <h1>Header</h1>
        <button onClick = { () => { this.props.getStock('NFLX', this.from, this.to) }} > add </button>
        <h3>Linebar</h3>
        <Chart width={960} height={500} from = {this.from} to = {this.to} />
      </div>
    )
  }
}


const mapStateToProps = ({stocks}) => {
  return {stocks};
}
export default connect(mapStateToProps, {getStock})(App)
