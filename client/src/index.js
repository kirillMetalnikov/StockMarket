import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {createStore, applyMiddleware} from 'redux'
import reduxThunk from 'redux-thunk'

import App from './component/App'
import reducers from './reducers'
import {socketListener} from './actions'

const store = createStore(reducers, {}, applyMiddleware(reduxThunk))
socketListener(store.dispatch)

ReactDOM.render(
  <Provider store = {store} ><App/></Provider>,
  document.querySelector('#app')
)
