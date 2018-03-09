import axios from 'axios'
import socketIO from 'socket.io-client'

import {ADD_STOCK, SET_DISPLAY_PERIOD, SET_STOCK_PERIOD, SET_PRICE_DOMAIN, SET_ACTIVE, DELETE_STOCK, SET_ACTIVE_DATE, SET_TOOLTIP, SET_ACTIVE_BUTTON} from '../const.js'

const socket = socketIO.connect(`/`)

export const socketListener = dispatch => {
  socket.on('add stock', ({stock, code}) => {
    stock.forEach( quote => {
      quote.date = new Date(quote.date)
    })

    if (stock.length != 0){
      dispatch({type: ADD_STOCK, stock, code, from: stock[0].date, to: stock[stock.length - 1].date})
    }

  })

  socket.on('message', mess => {
    console.log(mess)
  })

  socket.on('delete stock', ({code}) => {
    dispatch({type: DELETE_STOCK, code})
  })
}

export const getStock = (code, from, to) => dispatch => {
  socket.emit('get stock', {code, from, to})
}

export const deleteStock = (code) => dispatch => {
  socket.emit('delete stock', {code})
  dispatch({type: DELETE_STOCK, code})
}

export const setDisplayPeriod = (from, to) => dispatch => {
  dispatch({type: SET_DISPLAY_PERIOD, from, to})

  var timeDif = to.getTime() - from.getTime()
  var diffMonth = Math.round(timeDif / (1000 * 3600 * 24 * 30))

  if (diffMonth != 1 && diffMonth != 3 && diffMonth != 6 && diffMonth != 12) {
    dispatch({type: SET_ACTIVE_BUTTON, active: -1})
  }
}

export const setActive = (code) => dispatch => {
  dispatch({type: SET_ACTIVE, code})
}

export const setHoverDate = date => dispatch => {
  dispatch({type: SET_ACTIVE_DATE, date})
}

export const setTooltip = (show, target, data, activeDate) => dispatch => {
  dispatch({type: SET_TOOLTIP, tooltip: {show, target, data}})
}

export const setActiveButton = (e) => dispatch => {
  dispatch({type: SET_ACTIVE_BUTTON, active: e})
}
