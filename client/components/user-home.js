import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {getStocks, updateStocks} from '../store/index'

/**
 * COMPONENT
 */
// const dummyStocks = [
//   {symbol: 'APL', qty: 23, price: 250},
//   {symbol: 'ABB', qty: 2, price: 20},
//   {symbol: 'ABBV', qty: 22, price: 10},
//   {symbol: 'ABCB', qty: 3, price: 51}
// ]

class UserHome extends React.Component {
  constructor() {
    super()
    this.submitButton = this.submitButton.bind(this)
  }

  componentDidMount() {
    this.props.get_stocks(this.props.id)
    console.log('error is', this.props.error)
    if (this.props.error) {
      window.alert('there is an error')
    }
  }

  async submitButton(e) {
    e.preventDefault()

    const qty = Number(e.target.qty.value)
    const symbol = e.target.symbol.value.toUpperCase()
    await this.props.update_stocks({
      quantity: qty,
      symbol,
      userId: this.props.id
    })
    // clear the box
  }

  render() {
    const {firstName, portfolio, stocks} = this.props

    return (
      <div>
        <h3>Welcome, {firstName}</h3>
        <div className="main">
          <div className="portfolio">
            {stocks
              ? stocks.map(el => {
                  return (
                    <div key={el.id}>
                      {el.symbol} {el.quantity} {el.latestPrice * el.quantity}
                    </div>
                  )
                })
              : null}
          </div>
          <div className="transaction">
            <div>Cash - ${portfolio}</div>
            <form onSubmit={this.submitButton}>
              <input type="number" name="qty" placeholder="Qty" />
              <input type="text" name="symbol" placeholder="Symbol" />
              <input type="submit" value="Buy" />
            </form>
            {this.props.error ? (
              <div>Unable to process your transaction</div>
            ) : null}
          </div>
        </div>
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    id: state.user.id,
    firstName: state.user.firstName,
    portfolio: state.user.portfolio,
    stocks: state.stocks.stocks,
    error: state.stocks.error
  }
}

const mapDispatch = dispatch => {
  return {
    get_stocks: id => dispatch(getStocks(id)),
    update_stocks: transaction => dispatch(updateStocks(transaction))
  }
}

export default connect(mapState, mapDispatch)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  firstName: PropTypes.string,
  portfolio: PropTypes.number
}
