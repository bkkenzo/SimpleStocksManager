import axios from 'axios'

/**
 * ACTION TYPES
 */
const GOT_TRANSACTIONS = 'GOT_TRANSACTIONS'

/**
 * INITIAL STATE
 */
const defaultStocks = {transactions: []}

/**
 * ACTION CREATORS
 */
const gotTransactions = transactions => ({type: GOT_TRANSACTIONS, transactions})
/**
 * THUNK CREATORS
 */

export const getTransactions = id => async dispatch => {
  // let stocks
  try {
    const data = await axios.get(`/api/transactions/${id}`)
    const transactions = data.data
    dispatch(gotTransactions(transactions))
  } catch (error) {
    console.log(error)
  }
}

/**
 * REDUCER
 */
export default function(state = defaultStocks, action) {
  switch (action.type) {
    case GOT_TRANSACTIONS:
      return {...state, transactions: action.transactions}
    default:
      return state
  }
}
