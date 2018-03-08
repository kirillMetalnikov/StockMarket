import axios from 'axios'
import socketIO from 'socket.io-client'

import {ADD_STOCK, SET_DISPLAY_PERIOD, SET_STOCK_PERIOD, SET_PRICE_DOMAIN, SET_ACTIVE, DELETE_STOCK, SET_ACTIVE_DATE, SET_TOOLTIP} from '../const.js'

const socket = socketIO.connect(`/`)

export const socketListener = dispatch => {
  var lowPrice = Infinity
  var maxPrice = 0
  socket.on('add stock', ({stock, code}) => {
    stock.forEach( quote => {
      quote.date = new Date(quote.date)
      if( quote.close > maxPrice) maxPrice = quote.close
      if( quote.close < lowPrice) lowPrice = quote.close
    })

    if (stock.length != 0){
      dispatch({type: SET_PRICE_DOMAIN, from: lowPrice, to: maxPrice})
      dispatch({type: SET_STOCK_PERIOD, from: stock[stock.length - 1].date, to: stock[0].date})
      dispatch({type: ADD_STOCK, stock, code})
    }

  })

  socket.on('message', mess => {
    console.log(mess)
  })

  socket.on('delete stock', ({code}) => {
    dispatch({type: DELETE_STOCK, code})
  })
/*  socket.on('stock period', ({from, to}) => {
    dispatch({type: SET_STOCK_PERIOD, from: new Date(from), to: new Date(to)})
  })
  */
}

export const getStock = (code, from, to) => dispatch => {
  socket.emit('get stock', {code, from, to})

  /*
  axios.get(`/api/getStock/${code}/${from}/${to}`).then(res => {
    res.data.forEach( quote => {
      quote.date = new Date(quote.date)
    } )
    dispatch({type: ADD_STOCK, stock: res.data, code})
  })
  */
}

export const deleteStock = (code) => dispatch => {
  socket.emit('delete stock', {code})
  dispatch({type: DELETE_STOCK, code})
}

export const setDisplayPeriod = (from, to) => dispatch => {
  dispatch({type: SET_DISPLAY_PERIOD, from, to})
}

export const setActive = (code) => dispatch => {
  dispatch({type: SET_ACTIVE, code})
}

export const setHoverDate = date => dispatch => {
  dispatch({type: SET_ACTIVE_DATE, date})
}

export const setTooltip = (show, target, text) => dispatch => {
  text = text.toString()
  dispatch({type: SET_TOOLTIP, tooltip: {show, target, text}})
}
