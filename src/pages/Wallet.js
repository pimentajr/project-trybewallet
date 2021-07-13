import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// import axios from 'axios';

class Wallet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currencyStateList: {},
    };

    this.renderSelectTag = this.renderSelectTag.bind(this);
    this.getAPI = this.getAPI.bind(this);
    this.changedCurrencyAPIList = this.changedCurrencyAPIList.bind(this);
  }

  async componentDidMount() {
    this.changedCurrencyAPIList();
  }

  async getAPI() {
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const acurrencyList = response.json();
    return acurrencyList;
  }

  // async getAPI() {
  //   axios
  //     .get('https://economia.awesomeapi.com.br/json/all')
  //     .then((response) => {
  //       const currencyList = await response.data;
  //       return currencyList;
  //     });
  // }

  changedCurrencyAPIList() {
    const stateList = this.getAPI();
    this.setState({ currencyStateList: stateList });
    console.log('changedCurrencyAPIList', stateList);
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
    const { email } = this.props;
    const { currencyStateList } = this.state;
    console.log('depois do render', currencyStateList);
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
              {!currencyStateList && Object.values(currencyStateList).map((currency) => (
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
});

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Wallet);
