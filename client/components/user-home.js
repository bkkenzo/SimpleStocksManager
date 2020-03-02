import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {getStocks, updateStocks} from '../store/index'
/**
 * COMPONENT
 */
class UserHome extends React.Component {
  constructor() {
    super()
    this.state = {
      qty: '',
      symbol: ''
    }
    this.submitButton = this.submitButton.bind(this)
    this.onChange = this.onChange.bind(this)
  }

  componentDidMount() {
    this.props.get_stocks(this.props.id)
  }

  async submitButton(e) {
    e.preventDefault()

    const qty = this.state.qty
    const symbol = this.state.symbol.toUpperCase()
    await this.props.update_stocks({
      quantity: qty,
      symbol,
      userId: this.props.id
    })
    this.setState({
      qty: '',
      symbol: ''
    })
  }

  onChange(e) {
    const name = e.target.name
    const value = name === 'qty' ? Number(e.target.value) : e.target.value
    // console.log("value is", e.target.name)
    this.setState({[name]: value})
  }

  render() {
    const {firstName, myCash, stocks} = this.props
    const titleStyle = {textAlign: 'center', fontWeight: 'bold'}
    return (
      <div>
        <h3>Welcome, {firstName}</h3>
        <div className="main">
          <div className="portfolio">
            <div style={titleStyle}>Portfolio</div>
            {stocks
              ? stocks.map(el => {
                  return (
                    <div key={el.id} className="stocks">
                      <div className="left">
                        {el.symbol} - {el.quantity} Shares{' '}
                      </div>{' '}
                      <div className="right">
                        {' '}
                        $ {Math.floor(el.latestPrice * el.quantity * 100) / 100}
                      </div>
                    </div>
                  )
                })
              : null}
          </div>
          <div className="transaction">
            <div style={titleStyle}>
              Cash - $ {Math.floor(myCash * 100) / 100}
            </div>
            <form onSubmit={this.submitButton}>
              <input
                type="number"
                name="qty"
                placeholder="Qty"
                onChange={this.onChange}
                value={this.state.qty}
              />
              <input
                type="text"
                name="symbol"
                placeholder="Symbol"
                onChange={this.onChange}
                value={this.state.symbol}
              />
              <input type="submit" value="Buy" />
            </form>
            {this.props.error ? (
              <div style={{color: 'red'}}>
                Unable to process your transaction
              </div>
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
    myCash: state.stocks.myCash,
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
  firstName: PropTypes.string
}
