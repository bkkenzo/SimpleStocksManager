import axios from 'axios'

/**
 * ACTION TYPES
 */
const GOT_STOCKS = 'GOT_STOCKS'
const UPDATED_STOCKS = 'UPDATED_STOCKS'

/**
 * INITIAL STATE
 */
const defaultStocks = {stocks: []}

/**
 * ACTION CREATORS
 */
const gotStocks = stocks => ({type: GOT_STOCKS, stocks})
const updatedStocks = stocks => ({type: UPDATED_STOCKS, stocks})

/**
 * THUNK CREATORS
 */

export const getStocks = id => async dispatch => {
  // let stocks
  try {
    const data = await axios.get(`/api/stocks/${id}`)
    const stocks = data.data
    console.log(data.data)
    dispatch(gotStocks(stocks))
  } catch (error) {
    console.log(error)
  }
}

export const updateStocks = transaction => async dispatch => {
  let stocks
  try {
    stocks = await axios.post(`/api/stocks`, transaction)
    console.log('int the store >>>>>', stocks.data)
    dispatch(updatedStocks(stocks.data))
  } catch (error) {
    dispatch(updatedStocks({error: error}))
  }

  // try {
  //   dispatch(updatedStocks(stocks.dataValues))
  // } catch (error) {
  //   console.error(error)
  // }
}

/**
 * REDUCER
 */
export default function(state = defaultStocks, action) {
  switch (action.type) {
    case GOT_STOCKS:
      return {...state, stocks: [...state.stocks, ...action.stocks]}
    case UPDATED_STOCKS:
      return {...state, stocks: [...state.stocks, action.stocks]}
    default:
      return state
  }
}
