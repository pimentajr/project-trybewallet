import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Button from './Button';
import Value from './Value';
import Description from './Description';
import { saveExpense } from '../actions';

class WalletForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: '',
      description: '',
      currency: 'USD',
      method: '',
      tag: '',
    };

    this.handleEvent = this.handleEvent.bind(this);
  }

  handleEvent({ target }) {
    this.setState({ [target.name]: target.value });
  }

  render() {
    const { currencies, savedExpenses } = this.props;
    const { value, description, currency, method, tag } = this.state;
    return (
      <form className="wallet-form">
        <Value value={ value } handleEvent={ this.handleEvent } />
        <Description value={ description } handleEvent={ this.handleEvent } />
        <label htmlFor="currency">
          Moeda:
          <select id="currency" onChange={ this.handleEvent } name="currency">
            { currencies.map((coin) => (
              <option
                value={ coin }
                key={ currency }
              >
                {coin}
              </option>)) }
          </select>
        </label>
        <label htmlFor="payment">
          Método de Pagamento:
          <select
            id="payment"
            name="method"
            value={ method }
            onChange={ this.handleEvent }
          >
            <option>Dinheiro</option>
            <option>Cartão de crédito</option>
            <option>Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="tag">
          Tag:
          <select id="tag" name="tag" value={ tag } onChange={ this.handleEvent }>
            <option>Alimentação</option>
            <option>Lazer</option>
            <option>Trabalho</option>
            <option>Transporte</option>
            <option>Saúde</option>
          </select>
        </label>
        <Button expenses={ savedExpenses } state={ this.state } />
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  savedExpenses: (expenses) => dispatch(saveExpense(expenses)),
});

WalletForm.propTypes = {
  map: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  savedExpenses: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);
