import {combineReducers} from 'redux'

import {ADD_STOCK, SET_DISPLAY_PERIOD, SET_STOCK_PERIOD} from '../const.js'

function stocks(state = [], action) {
  switch (action.type) {
    case ADD_STOCK:
      return [...state, {code: action.code, stock: action.stock}]
    default:
      return state
  }
}

var fromDate = new Date()
fromDate.setFullYear(fromDate.getFullYear() - 3)

function stockPeriod (state = {from: fromDate, to: new Date()}, action) {
  switch (action.type) {
    case SET_STOCK_PERIOD:
      var {from, to} = action
      return {from, to}
    default:
      return state
  }
}

function displayPeriod (state = {from: fromDate, to: new Date()}, action) {
  switch (action.type) {
    case SET_DISPLAY_PERIOD:
      var {from, to} = action
      return {from, to}
    case SET_STOCK_PERIOD:
      var {from, to} = action
      return {from, to}
    default:
      return state
  }
}

function displayTo (state = new Date(), action) {
  switch (action.type) {
    default:
      return state
  }
}
export default combineReducers({
  stocks,
  displayPeriod,
  stockPeriod
})
