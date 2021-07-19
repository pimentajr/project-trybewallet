import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CurrencySelect from './currencySelect';
import PaymentMethodSelect from './paymentSelect';
import CategorySelect from './categorySelect';
import { fetchCurrencies } from '../../actions';

class ExpenseForm extends Component {
  constructor() {
    super();
    this.state = ({
      isLoading: true,
      value: 0,
      description: '',
    });
    this.handleChange = this.handleChange.bind(this);
    this.loadingToFalse = this.loadingToFalse.bind(this);
  }

  async componentDidMount() {
    const { getCurrencies } = this.props;
    await getCurrencies();
    this.loadingToFalse();
  }

  async loadingToFalse() {
    this.setState(() => ({
      isLoading: false,
    }));
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  render() {
    const { isLoading, value, description } = this.state;
    return isLoading ? 'Loading' : (
      <form>
        <label htmlFor="expense-value">
          Valor
          <input
            type="number"
            id="expense-value"
            value={ value }
            onChange={ (e) => this.handleChange(e) }
          />
        </label>
        <label htmlFor="expense-description">
          Descrição
          <input
            type="text"
            id="expense-description"
            value={ description }
            onChange={ (e) => this.handleChange(e) }
          />
        </label>
        <CurrencySelect />
        <PaymentMethodSelect />
        <CategorySelect />
      </form>
    );
  }
}

ExpenseForm.propTypes = {
  getCurrencies: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  getCurrencies: (value) => dispatch(fetchCurrencies(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseForm);
