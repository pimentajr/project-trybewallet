import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchAPI } from '../actions';

class Wallet extends React.Component {
  constructor() {
    super();
    // this.state = {
    // //   value: 0,
    //   currency: 'USD',
    // //   method: '',
    // //   tag: '',
    // // };
    // };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    const { API } = this.props;
    API();
  }

  handleChange({ target: { name, value } }) {
    this.setState({
      [name]: value,
    });
  }

  Header() {
    const { email } = this.props;
    return (
      <header>
        <p data-testid="email-field" name="email">{email}</p>
        <p data-testid="total-field" name="total">0</p>
        <p data-testid="header-currency-field" name="currency">BRL</p>
      </header>
    );
  }

  Form() {
    const paymentMethods = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
    const { currencies } = this.props;
    return (
      <form>
        <label htmlFor="value">
          Valor
          <input type="number" name="value" id="value" onChange={ this.handleChange } />
        </label>
        <label htmlFor="description">
          Descrição
          <input
            type="text"
            name="description"
            id="description"
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="currency">
          Moeda
          <select name="currency" id="currency" onChange={ this.handleChange }>
            { currencies.map((currency, key) => (
              <option key={ key } value={ currency }>
                { currency }
              </option>
            ))}
          </select>
        </label>
        <label htmlFor="method">
          Método de pagamento:
          <select name="method" id="method" onChange={ this.handleChange }>
            { paymentMethods.map((method, key) => (
              <option key={ key } value={ method }>
                { method }
              </option>
            ))}
          </select>
        </label>
        { this.CategoryForm() }
      </form>
    );
  }

  CategoryForm() {
    const categories = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];
    return (
      <label htmlFor="tag">
        Tag:
        <select name="tag" id="tag" onChange={ this.handleChange }>
          { categories.map((category, key) => (
            <option key={ key } value={ category }>
              { category }
            </option>
          ))}
        </select>
      </label>
    );
  }

  render() {
    return (
      <div>
        { this.Header() }
        { this.Form() }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  currencies: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  API: () => dispatch(fetchAPI()),
});

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  API: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
