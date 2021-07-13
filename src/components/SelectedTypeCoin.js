import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class SelectedTypeCoin extends Component {
  render() {
    const { arrayCurrencies, myValue } = this.props;
    const { currency, funcHandleState } = myValue;
    return (
      <label htmlFor="moeda">
        Moeda
        <select
          id="moeda"
          value={ currency }
          name="currency"
          onChange={ funcHandleState }
        >
          { arrayCurrencies.map((res, index) => (
            <option key={ index }>{res}</option>)) }
        </select>
      </label>
    );
  }
}

const mapStateToProps = (state) => ({
  arrayCurrencies: state.wallet.currencies,
});

SelectedTypeCoin.propTypes = {
  myValue: PropTypes.shape.isRequired,
  arrayCurrencies: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default connect(mapStateToProps)(SelectedTypeCoin);
