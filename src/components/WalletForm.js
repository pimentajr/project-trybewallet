import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ValueInput from './ValueInput';
import CoinSelect from './CoinSelect';
import PaymentSelect from './PaymentSelect';
import TagSelect from './TagSelect';
import DescriptionInput from './DescriptionInput';
import { saveExpenses } from '../actions/walletActions';

class WalletForm extends Component {
  constructor() {
    super();

    this.state = {
      id: 0,
      value: 0,
      description: 'Hot Dog',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    };

    this.handleChange = this.handleChange.bind(this);
    this.addExpense = this.addExpense.bind(this);
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  addExpense() {
    const { pushExpense, exchangeRates } = this.props;
    const { id, value, description, currency, method, tag } = this.state;

    const expenses = {
      id,
      value,
      description,
      currency,
      method,
      tag,
      exchangeRates,
    };

    pushExpense(expenses);

    this.setState((crr) => ({
      id: crr.id + 1,
    }));
  }

  render() {
    // const { exchangeRates } = this.props;
    // console.log(exchangeRates);
    return (
      <form>
        <ValueInput funcHandleChange={ this.handleChange } />
        <DescriptionInput funcHandleChange={ this.handleChange } />
        <CoinSelect funcHandleChange={ this.handleChange } />
        <PaymentSelect funcHandleChange={ this.handleChange } />
        <TagSelect funcHandleChange={ this.handleChange } />
        <button
          type="button"
          onClick={ this.addExpense }
        >
          Adicionar despesa
        </button>
      </form>
    );
  }
}

const mapStateToProps = ({ wallet: { currencies } }) => ({
  exchangeRates: currencies,
});

const mapDispatchToProps = (dispatch) => ({
  pushExpense: (payload) => dispatch(saveExpenses(payload)),
});

WalletForm.propTypes = {
  pushExpense: PropTypes.func,
  exchangeRates: PropTypes.objectOf(),
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);
