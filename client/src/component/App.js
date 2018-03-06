import React, {Component} from 'react'
import {Grid, PageHeader, Well} from 'react-bootstrap'

import Chart from './Chart'
import AddStockForm from './AddStockForm'
import ControlDatePanel from './ControlDatePanel'
import CodeList from './CodeList'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {clientWidth: 1}
    this.hundleResize = this.hundleResize.bind(this)
  }

  hundleResize() {
    var {clientWidth} = this.well
    this.setState({clientWidth})
  }

  componentDidMount() {
    this.hundleResize()
    window.addEventListener("resize", this.hundleResize)
  }

  componentWillUnmount() {
    window.addEventListener("resize", null)
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
          <CodeList />
          <AddStockForm />
        </Grid>
    )
  }
}

export default App
