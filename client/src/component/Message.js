import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Modal, Button} from 'react-bootstrap'

import {hideModal} from '../actions'

class Message extends Component {
  constructor(props) {
    super(props)
  }

  render () {
    let {head, body, show} = this.props.message
    return (
      <Modal
        show={show}
        onHide={this.props.hideModal}
        container={this}
        aria-labelledby="contained-modal-title"
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title">
            {head}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {body}
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.props.hideModal}>Close</Button>
        </Modal.Footer>
      </Modal>
    )
  }
}

const mapStateToProps = ({message}) =>{
  return {message}
}

export default connect(mapStateToProps, {hideModal})(Message)
