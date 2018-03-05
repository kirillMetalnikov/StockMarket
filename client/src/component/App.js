import React, {Component} from 'react'
import {Grid, PageHeader, Well} from 'react-bootstrap'

import Chart from './Chart'
import AddStockForm from './AddStockForm'
import ControlDatePanel from './ControlDatePanel'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {clientWidth: 100}
  }

  componentDidMount() {
    var {clientWidth} = this.well
    this.setState({clientWidth})
  }

  render() {
    return (
        <Grid>
          <PageHeader>Watch stocks</PageHeader>
          <Well>
            <div ref = {ref => this.well = ref}>
              <ControlDatePanel />
              <Chart width={this.state.clientWidth} height={450}/>
            </div>
          </Well>
          <AddStockForm />
        </Grid>
    )
  }
}

export default App
