import React, {Component} from 'react'
import { connect } from 'react-redux'
import {Col, FormGroup, InputGroup, FormControl, Button} from 'react-bootstrap'

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
      <Col sm={12} md={4} lg = {3}>
        <div
          style = {
            {
              height: 100,
              border: '2px dashed red',
              borderLeft: `7px solid red`,
              padding: 10, position: 'relative',
              marginBottom: 20
            }
          }
        >
          <div style = {{fontWeight: 800, padding: '3px 20px'}}>
            Syncs in realtime
          </div>
          <div style = {{margin: 5}}>
            <FormGroup>
              <InputGroup>
                <FormControl type="text"  onChange = {this.hundleChange.bind(this)} value = {this.state.inputValue}/>
                <InputGroup.Button>
                  <Button onClick = { this.hundleSubmin.bind(this) }>Add</Button>
                </InputGroup.Button>
              </InputGroup>
            </FormGroup>
          </div>
        </div>
      </Col>
    )
  }
}

const mapStateToProps = ({stock, from, to}) => {
  var {stocks} = stock
  return {stocks, from, to};
}
export default connect(mapStateToProps, {getStock})(AddStockForm)
