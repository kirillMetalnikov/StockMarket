import {combineReducers} from 'redux'

import {ADD_STOCK} from '../const.js'

function stocks(state = [], action) {
  switch (action.type) {
    case ADD_STOCK:
      return [...state, {code: action.code, stock: action.stock}]
    default:
      return state
  }
}


export default combineReducers({
  stocks
})
