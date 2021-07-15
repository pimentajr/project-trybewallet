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
    // this.fetchCurrencies = this.fetchCurrencies.bind(this);
    this.formComponents = this.formComponents.bind(this);
    // this.pegaMoedas = this.pegaMoedas.bind(this);
    this.handleClickForm = this.handleClickForm.bind(this);
    // this.updateStateTotal = this.updateStateTotal.bind(this);
    this.handle = this.handle.bind(this);
  }

  componentDidMount() {
    const { fetchForWallet } = this.props;

    // this.fetchCurrencies();
    fetchForWallet();

    // console.log('Aqui o exchangeRates do estado');
    // console.log(exchangeRates);
    // console.log('Aqui o getCurrencies do Props');
    // console.log(getCurrencies);

    // this.setState({
    //   exchangeRates: getCurrencies,
    // });

    // console.log('DidMount exchangesRates" (State):');
    // console.log(exchangeRates);
  }

  componentDidUpdate() {
    const { getCurrencies } = this.props;
    console.log('Estado Local');
    console.log(this.state);
    console.log('Aqui o getCurrencies do Props');
    console.log(getCurrencies);
  }

  // updateStateLocal_Total() {
  // Pegar (por "mapStateToprops") o valor de VALUE em cada Objeto do Array e fazer a lógica de soma para atualizar "estado local" e renderizer o elemento (que já tá controlado)
  // Ou crie um nova chave (total: 0) logo no global e faz o elemento controlado direto.
  // Para essa segunda, podemos usar o mesmo reducer "wallet" e acrescentar um campo "total". Mas poderia criar outro reducer.
  // }

  setId() {
    this.setState((prevState) => ({
      id: prevState.id + 1,
    }));

    // this.setState({
    //   id: this.state.id + 1,
    // });
  }

  clearState() {
    const { getCurrencies } = this.props;

    this.setState({
      // id: 0, // Omitido pra permitir controle de id por setId()
      // currency: 'USD',
      // description: 'Dez dólares',
      // method: 'Cartão de crédito',
      // tag: '',
      // value: 10,
      // exchangeRates: getCurrencies,

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

    // for (let key in exchangeRates) {
    //   if (key === moeda) {
    //     let conv = valor * exchangeRates[key].ask;

    //     console.log(`valor convertido: ${conv}`);
    //     // throwToWallet({...this.state, valorConvertido: conv, exchangeRates: getCurrencies});
    //     throwToWallet({ ...this.state, valorConvertido: conv, exchangeRates: getCurrencies });

    // //     this.setState({
    // //       valorConvertido: conv,
    // //     });
    // //     console.log('Valor convertido que consta no state local:');
    // // console.log(valorConvertido);
    //     break;
    //   }
    // }

    // const { ask } = getCurrencies[value];
    const { ask } = getCurrencies[currency]; // Tem que ter valor no estado, senão "currency" fica vazio e dar "getCurrencies"  como indefined;
    console.log(' Teste de ask');
    console.log(ask);
    const conv = value * ask;
    throwToTotal(conv);
    throwToWallet({ ...this.state, exchangeRates: getCurrencies });
    // throwToWallet({ ...this.state, exchangeRates: getCurrencies });
    // console.log('Valor puro antes de passar para o state local');
    // console.log(conv);

    // this.setState({
    //   valorConvertido: conv,
    // });
    // console.log('Valor convertido que consta no state local:');
    // console.log(valorConvertido);

    // // const { ask } = getCurrencies[moeda];
    // console.log('.ask Conversão()');
    // console.log(ask);
    // const tudo = getCurrencies[moeda];
    // console.log('tudo Conversão()');
    // console.log(tudo);
  }

  handle({ target }) {
    this.setState({ [target.name]: target.value });
  }

  handleClickForm() {
    const { fetchForWallet } = this.props;
    // fetchForWallet({...this.state});
    // const { valorConvertido, exchangeRates, moeda } = this.state;

    // throwToWallet({...this.state, id: this.state.id + 1, exchangeRates: getCurrencies});

    this.conversao();

    // throwToWallet({ ...this.state, exchangeRates: getCurrencies });

    this.setId();

    // console.log('Moedaaa');
    // console.log(moeda);

    // console.log('Entrada "valorConvertido" (State):');
    // console.log(valorConvertido);

    // console.log('exchangeRates do Estado');
    // console.log(exchangeRates);

    fetchForWallet();
    this.clearState();

    // console.log('Teste de getCurrencies()');
    // console.log(getCurrencies);

    // const expensesLength = Object.keys(getExpenses).length;
    // console.log(`Length do expenses no global: ${expensesLength}`);
  }

  // fetchCurrencies() {
  //   const { sendCurrenciesGoodForm } = this.props;
  //   fetch('https://economia.awesomeapi.com.br/json/all').then((res) => res.json())
  //     .then((res) => sendCurrenciesGoodForm(res));
  // }

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
    // const moedinhas = getCurrencies ? Object.keys(getCurrencies).filter((key) => key !== 'USDT') : 'oi';
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

  // formComponents(getCurrencies) {
  formComponents() {
    // const { currencies } = this.state;
    const { value, currency, method, tag, description } = this.state;
    // const { getCurrencies } = this.props;
    // const { fetchForWallet } = this.props;

    return (
      <form className="form">
        {this.formComponentValor(value)}
        {/* {this.formComponentMoeda(currencies, moeda)} */}
        {this.formComponentMoeda(currency)}
        {/* {this.formComponentMoeda(getCurrencies, moeda)} */}
        {this.formComponentMetodoPagamento(method)}
        {this.formComponentTag(tag)}
        {this.formComponentDescricao(description)}
        <button className="btnAddDesp" type="button" onClick={ this.handleClickForm }>
          Adicionar despesa
        </button>
      </form>
    );
  }

  // pegaMoedas() {
  //   const { getCurrencies } = this.props;

  //   return Object.keys(getCurrencies).filter((key) => key !== 'USDT');
  // }

  render() {
    const { getLogin, getTotalExpenses } = this.props;
    const CAMBIO_INIT_VALUE = 'BRL';
    // const INIT = 0;
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
        {/* {this.formComponents(getCurrencies)} */}
        {/* {this.formComponents(this.pegaMoedas())} */}
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
  // sendCurrenciesGoodForm: (payload) => dispatch(requestCurrenciesGoodForm(payload)),
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
  // sendCurrenciesGoodForm: PropTypes.func.isRequired,
  fetchForWallet: PropTypes.func.isRequired,
  throwToWallet: PropTypes.func.isRequired,
  throwToTotal: PropTypes.func.isRequired,
  // ask: PropTypes.number.isRequired,
  ask: PropTypes.number,
  getCurrencies: PropTypes.objectOf(PropTypes.object),
};

export default connect(mapStateToProps, mapDispatchToprops)(Wallet);
