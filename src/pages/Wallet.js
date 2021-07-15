import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchAndAddToWallet, addToWallet, addToWalletTotal } from '../actions/index';

class Wallet extends React.Component {
  constructor() {
    super();

    this.state = {
      id: 0,
      method: '',
      currency: 'USD',
      description: '',
      tag: '',
      value: 0,
      exchangeRates: {},
    };

    this.conversao = this.conversao.bind(this);
    this.setId = this.setId.bind(this);
    this.clearState = this.clearState.bind(this);
    this.formComponents = this.formComponents.bind(this);
    this.handleClickForm = this.handleClickForm.bind(this);
    this.handle = this.handle.bind(this);
  }

  componentDidMount() {
    const { fetchForWallet } = this.props;
    fetchForWallet();
  }

  componentDidUpdate() {
    const { getCurrencies } = this.props;
    console.log('Estado Local');
    console.log(this.state);
    console.log('Aqui o getCurrencies do Props');
    console.log(getCurrencies);
  }

  setId() {
    this.setState((prevState) => ({
      id: prevState.id + 1,
    }));
  }

  clearState() {
    const { getCurrencies } = this.props;

    this.setState({

      currency: 'USD',
      description: '',
      method: '',
      tag: '',
      value: 0,
      exchangeRates: getCurrencies,
    });
  }

  conversao() {
    const { value, currency } = this.state;
    const { throwToWallet, throwToTotal, getCurrencies } = this.props;

    const { ask } = getCurrencies[currency]; // Tem que ter valor no estado, senão "currency" fica vazio e dar "getCurrencies"  como indefined;
    console.log(' Teste de ask');
    console.log(ask);
    const conv = value * ask;
    throwToTotal(conv);
    throwToWallet({ ...this.state, exchangeRates: getCurrencies });
  }

  handle({ target }) {
    this.setState({ [target.name]: target.value });
  }

  handleClickForm() {
    const { fetchForWallet } = this.props;

    this.conversao();

    this.setId();

    fetchForWallet();
    this.clearState();
  }

  formComponentValor(value) {
    return (
      <label htmlFor="valor">
        Valor:&nbsp;
        <input
          type="text"
          id="valor"
          className="valor"
          name="value"
          value={ value }
          onChange={ this.handle }
        />
      </label>
    );
  }

  formComponentMoeda(currency) { // getCurrencies chega com dados aqui normalmente.
    const { getCurrencies } = this.props;
    const moedinhas = Object.keys(getCurrencies).filter((key) => key !== 'USDT');
    return (
      <label htmlFor="Moeda">
        Moeda:&nbsp;
        <select
          id="Moeda"
          name="currency"
          value={ currency }
          onChange={ this.handle }
        >
          {moedinhas.map((opt, i) => <option key={ i }>{opt}</option>) }
        </select>
      </label>
    );
  }

  formComponentMetodoPagamento(method) {
    return (
      <label htmlFor="Método de pagamento">
        Método de pagamento:&nbsp;
        <select
          id="Método de pagamento"
          name="method"
          value={ method }
          onChange={ this.handle }
        >
          <option>Dinheiro</option>
          <option>Cartão de crédito</option>
          <option>Cartão de débito</option>
        </select>
      </label>
    );
  }

  formComponentTag(tag) {
    return (
      <label htmlFor="Tag">
        Tag:&nbsp;
        <select
          id="Tag"
          name="tag"
          value={ tag }
          onChange={ this.handle }
        >
          <option>Alimentação</option>
          <option>Lazer</option>
          <option>Trabalho</option>
          <option>Transporte</option>
          <option>Saúde</option>
        </select>
      </label>
    );
  }

  formComponentDescricao(description) {
    return (
      <label htmlFor="Descrição">
        Descrição:&nbsp;
        <input
          type="text"
          id="Descrição"
          name="description"
          value={ description }
          onChange={ this.handle }
        />
      </label>
    );
  }

  formComponents() {
    const { value, currency, method, tag, description } = this.state;

    return (
      <form className="form">
        {this.formComponentValor(value)}
        {this.formComponentMoeda(currency)}
        {this.formComponentMetodoPagamento(method)}
        {this.formComponentTag(tag)}
        {this.formComponentDescricao(description)}
        <button className="btnAddDesp" type="button" onClick={ this.handleClickForm }>
          Adicionar despesa
        </button>
      </form>
    );
  }

  render() {
    const { getLogin, getTotalExpenses } = this.props;
    const CAMBIO_INIT_VALUE = 'BRL';
    return (
      <div>
        <div className="walletHeader">
          <h3>TrybeWallet</h3>
          <div className="walletHeaderRight">
            <span className="email" data-testid="email-field">
              { getLogin }
            </span>
            <span className="total" data-testid="total-field">
              Total: &nbsp;
              { getTotalExpenses }
            </span>
            <span data-testid="header-currency-field">
              { CAMBIO_INIT_VALUE }
            </span>
          </div>
        </div>
        {this.formComponents()}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  getLogin: state.user.email,
  getCurrencies: state.wallet.cotacoes,
  getTotalExpenses: state.wallet.total,
  getExpenses: state.wallet.expenses,
});

const mapDispatchToprops = (dispatch) => ({
  fetchForWallet: () => dispatch(fetchAndAddToWallet()),
  throwToWallet: (state) => dispatch(addToWallet(state)),
  throwToTotal: (state) => dispatch(addToWalletTotal(state)),
});

Wallet.defaultProps = {
  getTotalExpenses: 0,
  getCurrencies: {},
  ask: 0,
};

Wallet.propTypes = {
  getLogin: PropTypes.string.isRequired,
  getTotalExpenses: PropTypes.number,
  fetchForWallet: PropTypes.func.isRequired,
  throwToWallet: PropTypes.func.isRequired,
  throwToTotal: PropTypes.func.isRequired,
  ask: PropTypes.number,
  getCurrencies: PropTypes.objectOf(PropTypes.object),
};

export default connect(mapStateToProps, mapDispatchToprops)(Wallet);
