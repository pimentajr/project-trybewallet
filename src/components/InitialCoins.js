import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class InitialCoins extends Component {
  render() {
    const { askCoin } = this.props;
    return (
      <>
        { Object.keys(askCoin).map((value, key) => {
          if (value !== 'USDT') {
            return (
              <option key={ key }>{ value }</option>);
          }
          return null;
        }) }
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  askCoin: state.wallet.currencies,
});

export default connect(mapStateToProps)(InitialCoins);

InitialCoins.propTypes = ({
  askCoin: PropTypes.func,
}).isRequired;
