import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class ExpenseForm extends React.Component {
  constructor() {
    super();

    this.state = {
      currencies: '',
    };

    this.getCurrencies = this.getCurrencies.bind(this);
  }

  componentDidMount() {
    this.getCurrencies();
  }

  async getCurrencies() {
    try {
      const response = await fetch('https://economia.awesomeapi.com.br/json/all');
      const results = await response.json();
      const filter = Object.keys(results).filter((currencies) => currencies !== 'USDT');
      console.log(filter);
      this.setState({
        currencies: filter,
      });
    } catch (error) {
      this.setState({
        currencies: error,
      });
    }
  }

  render() {
    const { currencies } = this.state;
    return (
      <section>
        <form>
          <label htmlFor="valor">
            Valor
            <input type="text" id="valor" name="valor" />
          </label>
          <label htmlFor="descricao">
            Descrição
            <input type="text" id="descricao" name="descricao" />
          </label>
          <label htmlFor="currency">
            Moeda
            <select id="currency">
              {currencies
                ? currencies.map((item, index) => (
                  <option value={ item } key={ index }>{item}</option>))
                : <option>erro</option>}
            </select>
          </label>
          <label htmlFor="payment-method">
            Método de pagamento
            <select id="payment-method">
              <option value="dinheiro">Dinheiro</option>
              <option value="credito">Cartão de crédito</option>
              <option value="debito">Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="tag">
            Tag
            <select id="tag">
              <option value="alimentacao">Alimentação</option>
              <option value="lazer">Lazer</option>
              <option value="trabalho">Trabalho</option>
              <option value="transporte">Transporte</option>
              <option value="saude">Saúde</option>
            </select>
          </label>
        </form>
        <Link to="/">
          <button type="button">Voltar</button>
        </Link>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  currency: state.currency.currency,
});

ExpenseForm.propTypes = {
  currency: PropTypes.arrayOf,
}.isRequired;

export default connect(mapStateToProps)(ExpenseForm);
