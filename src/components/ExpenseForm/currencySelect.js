import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class CurrencySelect extends Component {
  constructor(props) {
    super();
    const { currencies } = props;
    this.state = ({
      currency: currencies[0],
    });
    this.handleSelect = this.handleSelect.bind(this);
  }

  handleSelect({ target }) {
    this.setState(() => ({
      currency: target.value,
    }));
  }

  render() {
    const { currencies } = this.props;
    const { currency } = this.state;
    return (
      <label htmlFor="expense-currency">
        Moeda
        <select
          id="expense-currency"
          value={ currency }
          onChange={ (e) => this.handleSelect(e) }
        >
          { currencies.map((currCurrency, index) => (
            <option value={ currCurrency } key={ index }>
              {currCurrency}
            </option>))}
        </select>
      </label>
    );
  }
}

CurrencySelect.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
};

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

export default connect(mapStateToProps)(CurrencySelect);
