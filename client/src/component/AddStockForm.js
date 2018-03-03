import React, {Component} from 'react'
import { connect } from 'react-redux'

import {getStock} from '../actions'

class AddStockForm extends Component {
  constructor(props) {
    super(props)

    this.state = {inputValue: ''}
  }

  hundleChange(e) {
    e.preventDefault()
    this.setState({inputValue: e.target.value})

  }

  hundleSubmin(e) {
    e.preventDefault()
    this.setState({inputValue: ''})
    this.props.getStock(this.state.inputValue, this.props.from, this.props.to)
  }

  render() {
    return (
      <form onSubmit = { this.hundleSubmin.bind(this) }>
        <input onChange = {this.hundleChange.bind(this)} value = {this.state.inputValue}></input>
        <button type = 'submit'>Add</button>
      </form>
    )
  }
}

const mapStateToProps = ({stocks, from, to}) => {
  return {stocks, from, to};
}
export default connect(mapStateToProps, {getStock})(AddStockForm)
