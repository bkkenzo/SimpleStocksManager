import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import axios from 'axios'

/**
 * COMPONENT
 */
const dummyStocks = [
  {symbol: 'APL', qty: 23, price: 250},
  {symbol: 'ABB', qty: 2, price: 20},
  {symbol: 'ABBV', qty: 22, price: 10},
  {symbol: 'ABCB', qty: 3, price: 51}
]
export const UserHome = props => {
  const {firstName, portfolio} = props

  async function submitButton(e) {
    e.preventDefault()
    const symbol = e.target.symbol.value
    const apiData = await axios.get(
      'https://cloud.iexapis.com/stable/stock/' +
        symbol +
        '/quote?token=pk_c819bda3a3234f01a527b1a45b062dab'
    )

    console.log(apiData.data.latestPrice)
  }
  return (
    <div>
      <h3>Welcome, {firstName}</h3>
      <div className="main">
        <div className="portfolio">
          {dummyStocks.map((el, idx) => {
            return (
              <div key={idx}>
                {el.symbol} {el.qty} {el.price * el.qty}
              </div>
            )
          })}
        </div>
        <div className="transaction">
          <div>Cash - ${portfolio}</div>
          <form onSubmit={submitButton}>
            <input type="number" name="qty" placeholder="Qty" />
            <input type="text" name="symbol" placeholder="Symbol" />
            <input type="submit" value="Buy" />
          </form>
        </div>
      </div>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    firstName: state.user.firstName,
    portfolio: state.user.portfolio
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  firstName: PropTypes.string,
  portfolio: PropTypes.number
}
