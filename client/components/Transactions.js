import React from 'react'
// import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {getTransactions} from '../store/index'

class Transactions extends React.Component {
  componentDidMount() {
    this.props.get_transactions(this.props.id)
  }

  render() {
    const {transactions} = this.props
    return (
      <div>
        <div className="main">
          <div className="transactions">
            {transactions
              ? transactions.map(el => {
                  return (
                    <div key={el.id}>
                      {el.symbol} {el.quantity} {el.price * el.quantity}
                    </div>
                  )
                })
              : null}
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
    transactions: state.transactions.transactions,
    id: state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    get_transactions: id => dispatch(getTransactions(id))
  }
}

export default connect(mapState, mapDispatch)(Transactions)

/**
 * PROP TYPES
 */
// Transactions.propTypes = {
//   transactions: PropTypes.object
// }
