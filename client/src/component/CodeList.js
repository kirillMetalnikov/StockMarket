import React, {Component} from 'react'
import { connect } from 'react-redux'
import {setActive, deleteStock} from '../actions'
import {Col, Button, Glyphicon} from 'react-bootstrap'
import * as d3 from 'd3'

class CodeList extends Component {
  constructor(props) {
    super(props)
    this.deleteHundler = this.deleteHundler.bind(this)
  }

  deleteHundler(code) {
    return () => this.props.deleteStock(code)
  }

  render() {
    var {stocks, activeCode} = this.props
    var color = d3.schemeCategory20
    return (
      <div>
        {stocks.map( ({code, longName, exchangeName}, index) => {
          let borderColor = activeCode == code ? color[index] : 'gray'
          let headerColor = activeCode == code ? 'black' : color[index]
          let active = false
          return (
            <Col sm={12} md={4} lg = {3} key = {code} >
              <div
                style = {
                  {
                    height: 100,
                    border: `2px dashed ${borderColor}`,
                    borderLeft: `7px solid ${borderColor}`,
                    padding: 10,
                    paddingTop: 3,
                    marginBottom: 20,
                    color: 'gray'
                  }
                }
                onMouseOver = {() => this.props.setActive(code)}
                onMouseLeave = {() => this.props.setActive('')}
              >
                <Glyphicon glyph="remove" style = {{float: 'right'}} onClick = {this.deleteHundler(code)}/>
                <div style = {{fontSize: 24,  fontWeight: 800, borderBottom: '1px solid gray', padding: '3px 20px', color: 'black'}}>
                    {code}
                </div>
                <div style = {{margin: 5}}>
                  {longName} ({exchangeName})
                </div>
              </div>
            </Col>
          )
          })}
      </div>
    )
  }
}

const mapStateToProps = ({stock, activeCode}) => {
  var {stocks} = stock
  return {stocks, activeCode}
}
export default connect(mapStateToProps, {setActive, deleteStock})(CodeList)
