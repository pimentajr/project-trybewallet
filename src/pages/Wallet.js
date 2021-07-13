import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Solução baseada em: https://github.com/reduxjs/react-redux/issues/255#issuecomment-259512261

const requestCurrencies = () => ({
  type: 'REQUEST_CURRENCIES',
});

const receiveCurrencies = (currencies) => ({
  type: 'RECEIVE_CURRENCIES',
  currencies,
});

class Wallet extends React.Component {
  constructor(props) {
    super(props);
    this.renderSelectTag = this.renderSelectTag.bind(this);
  }

  componentDidMount() {
    const { requestCurrienciesProps, dispatcher } = this.props;
    dispatcher(requestCurrienciesProps());
  }

  renderSelectTag() {
    return (
      <label htmlFor="tag">
        Tag
        <select role="combobox" id="tag">
          <option value="food">Alimentação</option>
          <option value="laze">Lazer</option>
          <option value="work">Trabalho</option>
          <option value="Transport">Transporte</option>
          <option value="health">Saúde</option>
        </select>
      </label>
    );
  }

  render() {
    const { email, currencies } = this.props;
    console.log(currencies);
    return (
      <div>
        <header>
          <p data-testid="email-field">{email}</p>
          <p data-testid="total-field"> 0 </p>
          <p data-testid="header-currency-field"> BRL </p>
        </header>
        <form>
          <label htmlFor="input-value">
            Valor
            <input id="input-value" type="text" />
          </label>
          <label htmlFor="description">
            Descrição
            <input id="description" type="text" />
          </label>
          <label htmlFor="currency">
            Moeda
            <select role="combobox" id="currency">
              {currencies
                && Object.values(currencies)
                  .filter((currency) => currency.codein !== 'BRLT')
                  .map((currency) => (
                    <option value={ currency.code } key={ currency.code }>
                      {currency.code}
                    </option>
                  ))}
            </select>
          </label>
          <label htmlFor="payment-method">
            Método de Pagamento
            <select role="combobox" id="payment-method">
              <option value="money"> Dinheiro</option>
              <option value="credit-card">Cartão de crédito</option>
              <option value="debit-card">Cartão de débito</option>
            </select>
          </label>
          {this.renderSelectTag()}
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  currencies: state.wallet.currencies,
});

function requestCurrenciesAndDispatchReceiveCurrencies() {
  return (myDispatcher) => {
    // Não entendi a necessidade disso!
    myDispatcher(requestCurrencies());

    return fetch('https://economia.awesomeapi.com.br/json/all')
      .then((response) => response.json())
      .then((currencies) => myDispatcher(receiveCurrencies(currencies)));
  };
}

const mapDispatchToProps = (dispatcher) => ({
  requestCurrienciesProps: requestCurrenciesAndDispatchReceiveCurrencies,
  dispatcher,
});

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
  currencies: PropTypes.objectOf(PropTypes.string).isRequired,
  requestCurrienciesProps: PropTypes.func.isRequired,
  dispatcher: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
