import React, {Component} from 'react'

import Chart from './Chart'



class App extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <h1>Header</h1>
        <button onClick = { () => {this.setState({startDate: parseTime('2017-11-30'), endDate: parseTime('2018-02-25')})}} > change </button>
        <h3>Linebar</h3>
        <Chart  width={960} height={500}/>
      </div>
    )
  }
}

export default App
