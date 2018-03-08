import {combineReducers} from 'redux'

import {ADD_STOCK, SET_DISPLAY_PERIOD, SET_STOCK_PERIOD, SET_PRICE_DOMAIN, SET_ACTIVE, DELETE_STOCK, SET_ACTIVE_DATE, SET_TOOLTIP} from '../const.js'

var fromDate = new Date()
fromDate.setFullYear(fromDate.getFullYear() - 3)

const stocks = (state = [], action) => {
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



const stockPeriod = (state = {from: fromDate, to: new Date()}, action) => {
  switch (action.type) {
    case ADD_STOCK:
      var {from, to} = action
      return {from, to}
    default:
      return state
  }
}

const displayPeriod = (state = {from: fromDate, to: new Date()}, action) => {
  switch (action.type) {
    case SET_DISPLAY_PERIOD:
      var {from, to} = action
      return {from, to}
    case ADD_STOCK:
      var {from, to} = action
      return {from, to}
    default:
      return state
  }
}

const priceDomain = (state = {from: 0, to: 0}, action) => {
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

var from = new Date()
from.setFullYear(from.getFullYear() - 3)
var to = new Date()

var initialStock = {
  stockPeriod: {from, to},
  displayPeriod: {from, to},
  priceDomain: {from: 0, to: 0},
  stocks: [],
  displayStocks: []
}

const getMinMaxPrice = (stocks) => {
  var lowPrice = Infinity
  var maxPrice = 0
  stocks.forEach( ({stock}) => {
    stock.forEach( quote => {
      if( quote.close > maxPrice) maxPrice = quote.close
      if( quote.close < lowPrice) lowPrice = quote.close
    })
  })
  return {from: lowPrice, to: maxPrice}
}

const getDisplayStock = (stocks, displayPeriod) => {
  var {from, to} = displayPeriod
  return stocks.map ( ({stock, code}) => {
    stock = stock.filter( ({date}) => {
      return date.getTime() >=from.getTime() && date.getTime() <= to.getTime()
    })

    return {code, stock}
  })
}

const stock = (state = initialStock, action ) => {
  var newState= Object.assign({}, state)
  switch (action.type) {
    case SET_DISPLAY_PERIOD:
      newState.displayPeriod = displayPeriod(newState.displayPeriod, action)
      newState.displayStocks = getDisplayStock(newState.stocks, newState.displayPeriod)
      return newState
    case SET_PRICE_DOMAIN:
      newState.priceDomain = priceDomain(newState.priceDomain, action)
      return newState
    case ADD_STOCK:
      if (state.stocks.length == 0) {
        newState.stockPeriod = stockPeriod(newState.stockPeriod, action)
        newState.displayPeriod = displayPeriod(newState.displayPeriod, action)
      }
      newState.priceDomain = priceDomain(newState.priceDomain, action)
      newState.stocks = stocks(newState.stocks, action)
      newState.priceDomain = getMinMaxPrice(newState.stocks)
      newState.displayStocks = getDisplayStock(newState.stocks, newState.displayPeriod)
      return newState
    case DELETE_STOCK:
      newState.stocks = stocks(newState.stocks, action)
      newState.priceDomain = getMinMaxPrice(newState.stocks)
      newState.displayStocks = getDisplayStock(newState.stocks, newState.displayPeriod)
      return newState
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

const activeDate = (state = null, action) => {
  switch (action.type) {
    case SET_ACTIVE_DATE:
      return action.date
    default:
      return state

  }
}

const tooltip = (state ={}, action) => {
  switch (action.type) {
    case SET_TOOLTIP:
      var {show, target, text} = action.tooltip
      return {show, target, text}
    default:
      return state
  }
}

export default combineReducers({
  stock,
  activeCode,
  activeDate,
  tooltip
})
