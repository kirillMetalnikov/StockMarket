import axios from 'axios'

import {ADD_STOCK} from '../const.js'


export const getStock = (code, from, to) => dispatch => {
  axios.get(`/api/getStock/${code}/${from}/${to}`).then(res => {
    res.data.forEach( quote => {
      quote.date = new Date(quote.date)
    } )
    dispatch({type: ADD_STOCK, stock: res.data, code})
  })
}
