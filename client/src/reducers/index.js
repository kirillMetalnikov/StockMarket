import {combineReducers} from 'redux'

import {ADD_STOCK, SET_DISPLAY_PERIOD, SET_STOCK_PERIOD, SET_PRICE_DOMAIN, SET_ACTIVE, DELETE_STOCK} from '../const.js'

function stocks(state = [], action) {
  switch (action.type) {
    case ADD_STOCK:
      var codes = (state.map( stock => {
        return stock.code
      } ))
      if (codes.indexOf(action.code) != -1) return state

      return [...state, {code: action.code, stock: action.stock}]
    case DELETE_STOCK:
      return state.filter( stock => {
        return stock.code != action.code
      })
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

function priceDomain (state = {from: 0, to: 0}, action) {
  switch (action.type) {
    case SET_PRICE_DOMAIN:
      var from = state.from
      var to = state.to
      from = from == 0 ? action.from
        : from > action.from ? action.from : from
      to = to == 0 ? action.to
        : to < action.to ? action.to : to
      return {from, to}
    default:
      return state
  }
}

function activeCode (state = '', action) {
  switch (action.type) {
    case SET_ACTIVE:
      return action.code
    default:
      return state
  }
}

export default combineReducers({
  stocks,
  displayPeriod,
  stockPeriod,
  priceDomain,
  activeCode
})
