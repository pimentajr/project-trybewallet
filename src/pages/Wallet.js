import { connect } from 'react-redux';
import React from 'react';
import PropTypes from 'prop-types';
import FormsWallet from '../components/FormsWallet';
import { fetchCurrencies } from '../actions/wallet';
import ExpensesTable from '../components/ExpensesTable';

class Wallet extends React.Component {
  componentDidMount() {
    const { fetchCurrenciesAPI } = this.props;
    fetchCurrenciesAPI();
  }

  render() {
    const { email, loading } = this.props;
    return (
      <div>
        <header>
          <p data-testid="email-field">{email}</p>
          <p data-testid="total-field"> 0 </p>
          <p data-testid="header-currency-field"> BRL </p>
        </header>
        { (loading) ? <p>Carregando...</p> : <FormsWallet />}
        <ExpensesTable />
        <form>
          <label htmlFor="payment-method">
            Método de Pagamento
            <select role="combobox" id="payment-method">
              <option value="money"> Dinheiro</option>
              <option value="credit-card">Cartão de crédito</option>
              <option value="debit-card">Cartão de débito</option>
            </select>
          </label>
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
        </form>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  email: state.user.email,
  loading: state.wallet.isLoading,
});

const mapDispatchToProps = (dispatch) => ({
  fetchCurrenciesAPI: () => dispatch(fetchCurrencies()),
});
Wallet.propTypes = {
  email: PropTypes.string,
  fetchCurrenciesAPI: PropTypes.func,
  loading: PropTypes.bool,
}.isRequired;
export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
