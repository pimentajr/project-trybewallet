import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Head from '../components/WalletHeader';
import { fetchApiRequest, ADDExpense } from '../actions';

class Wallet extends React.Component {
  constructor() {
    const payments = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
    const tags = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];
    super();
    this.state = {
      valu: 0,
      descri: '',
      method: payments[0],
      tag: tags[0],
    };
    this.handleChanges = this.handleChanges.bind(this);
  }

  componentDidMount() {
    const { FetchApi } = this.props;
    FetchApi();
  }

  handleChanges({ target }) {
    const { value, name } = target;
    this.setState({
      [name]: value,
    });
    console.log(this.state);
  }

  handleButton(event) {
    event.preventDefault();
    const { expenseDispatch } = this.props;
    const { email, valu, descri, method, tag } = this.state;

    expenseDispatch([{ email, valu, descri, method, tag }]);
  }

  optionCreator(coinApi) {
    return Object.keys(coinApi).map((coin, index) => (
      coin !== 'USDT' ? <option key={ index } value={ coin }>{coin}</option>
        : null
    ));
  }

  render() {
    const { coinApi, email } = this.props;
    return (
      <div>
        <Head email={ email } />
        <form>
          <label htmlFor="valu">
            valor
            <input type="number" id="valu" name="valu" onChange={ this.handleChanges } />
          </label>
          <label htmlFor="descri">
            Descrição
            <input type="text" id="descr" name="descr" onChange={ this.handleChanges } />
          </label>
          <label htmlFor="coin">
            Moeda
            <select id="coin" name="coin" onChange={ this.handleChanges }>
              { this.optionCreator(coinApi) }
            </select>
          </label>
          <label htmlFor="payment">
            Método de pagamento
            <select id="payment" name="payment" onChange={ this.handleChanges }>
              <option value="Dinheiro">Dinheiro</option>
              <option value="Cartão de crédito">Cartão de crédito</option>
              <option value="Cartão de débito">Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="tag">
            Tag
            <select id="tag" name="tag" onChange={ this.handleChanges }>
              <option>Alimentação</option>
              <option>Lazer</option>
              <option>Trabalho</option>
              <option>Transporte</option>
              <option>Saúde</option>
            </select>
          </label>
          <button type="button">Adicionar Despesa</button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  coinApi: state.wallet.currencies,
});
Wallet.propTypes = {
  email: PropTypes.string.isRequired,
  FetchApi: PropTypes.func.isRequired,
  coinApi: PropTypes.objectOf(PropTypes.any).isRequired,
  expenseDispatch: PropTypes.func.isRequired,
};
const mapDispatchToProps = (dispatch) => ({
  FetchApi: (state) => dispatch(fetchApiRequest(state)),
  expenseDispatch: (state) => dispatch(ADDExpense(state)) });
export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
