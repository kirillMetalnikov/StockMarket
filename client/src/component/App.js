import React, {Component} from 'react'

import Chart from './Chart'
import AddStockForm from './AddStockForm'
import ControlDatePanel from './ControlDatePanel'

class App extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <h1>Header</h1>
        <ControlDatePanel />
        <Chart width={960} height={600}/>
        <AddStockForm />
      </div>
    )
  }
}

export default App
