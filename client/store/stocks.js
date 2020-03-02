import axios from 'axios'

/**
 * ACTION TYPES
 */
const GOT_STOCKS = 'GOT_STOCKS'
const UPDATED_STOCKS = 'UPDATED_STOCKS'
const GOT_ERROR = 'GOT_ERROR'

/**
 * INITIAL STATE
 */
const defaultStocks = {stocks: [], error: '', myCash: 0}

/**
 * ACTION CREATORS
 */
const gotStocks = stocks => ({type: GOT_STOCKS, stocks})
const updatedStocks = stocks => ({type: UPDATED_STOCKS, stocks})
const gotError = error => ({type: GOT_ERROR, error})

/**
 * THUNK CREATORS
 */

export const getStocks = id => async dispatch => {
  try {
    const stocks = await axios.get(`/api/stocks/${id}`)
    dispatch(gotStocks(stocks.data))
  } catch (error) {
    console.log('in the error reducer ')
  }
}

export const updateStocks = transaction => async dispatch => {
  let stocks
  try {
    stocks = await axios.post(`/api/stocks`, transaction)
    dispatch(updatedStocks(stocks.data))
  } catch (error) {
    dispatch(gotError({error: error.response.data}))
  }
}

/**
 * REDUCER
 */
export default function(state = defaultStocks, action) {
  switch (action.type) {
    case GOT_STOCKS:
      return {
        ...state,
        stocks: action.stocks.stocks,
        myCash: action.stocks.myCash,
        error: ''
      }
    case UPDATED_STOCKS:
      return {
        ...state,
        stocks: [
          ...state.stocks.filter(
            stock => stock.symbol !== action.stocks.symbol
          ),
          action.stocks
        ],
        myCash: action.stocks.myCash,
        error: ''
      }
    case GOT_ERROR:
      return {
        ...state,
        error: action.error.error
      }
    default:
      return state
  }
}
