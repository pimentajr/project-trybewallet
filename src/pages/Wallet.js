import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Form from './Form';
import { getCurrency } from '../actions';
import API from '../services/baseAPI';

class Wallet extends React.Component {
  constructor() {
    super();
    this.state = {
      initialValue: 0,
    };
  }

  componentDidMount() {
    this.getAPI();
  }

  async getAPI() {
    const fetchAPI = await API();
    const { propFetch } = this.props;
    const data = Object.keys(fetchAPI).filter((element) => element !== 'USDT');
    propFetch(data);
  }

  render() {
    const { login, expenses } = this.props;
    const { initialValue } = this.state;
    let result = initialValue;

    if (expenses.length > 0) {
      result = expenses.reduce((acc, current) => {
        const moedaSelecionada = current.currency;
        const cotacao = current.exchangeRates[moedaSelecionada];
        console.log(cotacao.ask);
        return acc + Number(current.value) * Number(cotacao.ask);
      }, 0);
    }

    return (
      <main>
        <header>
          <span data-testid="email-field">{ login }</span>
          <div>
            Despesa total: R$
            <span data-testid="total-field">{ result }</span>
            <span data-testid="header-currency-field">BRL</span>
          </div>
        </header>
        <Form />
      </main>
    );
  }
}

const mapStateToProps = (state) => ({
  login: state.user.email,
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  propFetch: (payload) => dispatch(getCurrency(payload)),
});

Wallet.propTypes = ({
  login: PropTypes.string,
  expenses: PropTypes.arrayOf(PropTypes.object),
  propFetch: PropTypes.func,
}).isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
