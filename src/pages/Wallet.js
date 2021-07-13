import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Valor from './components/Valor';
import Descrição from './components/Descricao';
import Moeda from './components/Moeda';
import Pagamento from './components/Pagamento';
import Tag from './components/Tag';
import * as actions from '../actions';
import Table from './components/Table';
import '../Wallet.css';

class Wallet extends React.Component {
  constructor() {
    super();
    this.state = {
      id: 0,
      value: '',
      description: '',
      currency: '',
      method: '',
      tag: '',
      exchangeRates: [],
    };

    this.readInput = this.readInput.bind(this);
    this.sendData = this.sendData.bind(this);
  }

  readInput(event) {
    const { value, name } = event.target;
    const { data } = this.props;
    this.setState({
      [name]: value,
      exchangeRates: data[0], // [0] porque é um array de objetos
    });
  }

  calulator() {
    const { expenses } = this.props;
    console.log(expenses);
    const total = expenses.reduce((acumulator, { exchangeRates, currency, value }) => (
      acumulator + (Number(exchangeRates[currency].ask) * Number(value))
    ), 0);
    console.log(total);
    return total.toFixed(2);
  }

  sendData() {
    const { saveExpenses, fetchCoins } = this.props;
    fetchCoins(); // segunda requisição para pegar valores mais atuais
    this.setState((oldState) => ({
      id: oldState.id + 1 }
    ));
    saveExpenses(this.state);
  }

  render() {
    const { email } = this.props;
    const { currency } = this.state;
    return (
      <section>
        <header>
          <h1>TrybeWallet</h1>
          <h3 data-testid="email-field">
            <p>Bem vindo!</p>
            { email }
          </h3>
          <h2 data-testid="total-field">
            Total:
            { this.calulator() }
          </h2>
          <h2 data-testid="header-currency-field">
            BRL
          </h2>
        </header>
        <form className="myform">
          <Valor
            inputValue={ this.readInput }
          />
          <Descrição
            inputValue={ this.readInput }
          />
          <Moeda
            inputValue={ this.readInput }
          />
          <Pagamento
            inputValue={ this.readInput }
          />
          <Tag
            inputValue={ this.readInput }
          />
          <button
            type="button"
            onClick={ this.sendData }
            disabled={ !currency }
          >
            Adicionar despesa
          </button>
        </form>
        <br />
        <Table />
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  data: state.wallet.currencies,
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  saveExpenses: (e) => dispatch(actions.saveExpenses(e)),
  fetchCoins: () => dispatch(actions.fetchCoins()),
});

Wallet.propTypes = {
  email: PropTypes.string,
  saveExpenses: PropTypes.func,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
