import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class InitialCoins extends React.Component {
  render() {
    const { askCoin } = this.props;
    return (
      <>
        { askCoin.map((value, key) => {
          if (value.codein !== 'BRLT') {
            return (
              <option key={ key }>{ value.code }</option>);
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
