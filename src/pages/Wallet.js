import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchCurrency } from '../actions';

class Wallet extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     value: '',
  //   };
  // }

  componentDidMount() {
    const { fetchCoins } = this.props;
    fetchCoins();
  }

  render() {
    const { userEmail, currency } = this.props;
    return (
      <div>
        <header>
          <p data-testid="email-field">{userEmail}</p>
          <p data-testid="total-field">{0}</p>
          <p data-testid="header-currency-field">BRL</p>
        </header>
        <form>
          <label htmlFor>
            Valor:
            <input type="text" name="valor" />
          </label>
          <label htmlFor>
            Descrição:
            <input type="text" name="descrição" />
          </label>
          <label htmlFor>
            Moeda:
            <select name="moeda">
              {currency.map((coin) => (
                <option key={ coin } value={ coin }>{coin}</option>
              ))}
            </select>
          </label>
          <label htmlFor>
            Método de Pagamento:
            <select name="método de pagamento">
              <option>Dinheiro</option>
              <option>Cartão de crédito</option>
              <option>Cartão de débito</option>
            </select>
          </label>
          <label htmlFor>
            Tag:
            <select name="tag">
              <option>Alimentação</option>
              <option>Lazer</option>
              <option>Trabalho</option>
              <option>Transporte</option>
              <option>Saúde</option>
            </select>
          </label>
        </form>
      </div>);
  }
}

const mapStateToProps = (state) => ({
  userEmail: state.user.email,
  currency: state.wallet.currencies });

const mapDispatchToProps = (dispatch) => ({
  fetchCoins: () => dispatch(fetchCurrency()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);

Wallet.propTypes = {
  userEmail: PropTypes.string,
}.isRequired;
