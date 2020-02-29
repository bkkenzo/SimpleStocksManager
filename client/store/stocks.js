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
const defaultStocks = {stocks: [], error: ''}

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
  // let stocks
  try {
    const data = await axios.get(`/api/stocks/${id}`)
    const stocks = data.data
    dispatch(gotStocks(stocks))
  } catch (error) {
    console.log(error)
  }
}

export const updateStocks = transaction => async dispatch => {
  let stocks
  try {
    stocks = await axios.post(`/api/stocks`, transaction)
    console.log('in the store action creator >>>>>', stocks.data)
    dispatch(updatedStocks(stocks.data))
  } catch (error) {
    console.log(error)
    dispatch(gotError({error: error}))
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
      return {...state, stocks: action.stocks, error: ''}
    case UPDATED_STOCKS:
      console.log('in the stock reducer', action.stocks)
      return {
        ...state,
        stocks: [
          ...state.stocks.filter(
            stock => stock.symbol !== action.stocks.symbol
          ),
          action.stocks
        ],
        error: ''
      }
    case GOT_ERROR:
      console.log(action.error)
      return {
        ...state,
        error: action.error
      }
    default:
      return state
  }
}
