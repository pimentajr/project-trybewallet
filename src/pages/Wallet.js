import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Wallet extends React.Component {
  constructor() {
    super();

    this.state = {
      currencies: [],
      total: 0,
      valor: 0,
      moeda: '',
      pagamento: '',
      tag: '',
      descricao: '',

    };

    this.fetchCurrencies = this.fetchCurrencies.bind(this);
    this.formComponents = this.formComponents.bind(this);
    // this.handleClickForm = this.handleClickForm.bind(this);
    // this.updateStateTotal = this.updateStateTotal.bind(this);
    this.handle = this.handle.bind(this);
  }

  componentDidMount() {
    this.fetchCurrencies();
  }

  handle({ target }) {
    this.setState({ [target.name]: target.value });
  }

  // updateStateLocal_Total() {
  // Pegar (por "mapStateToprops") o valor de VALUE em cada Objeto do Array e fazer a lógica de soma para atualizar "estado local" e rendereizer o elemento (que já tá controlado)
  // Ou crie um nova chave (total: 0) logo no global e faz o elemento controlado direto.
  // Para essa segunda, podemos usar o mesmo reducer "wallet" e acrescentar um campo "total". Mas poderia criar outro reducer.
  // }

  // handleClickForm() {
  // }

  fetchCurrencies() {
    fetch('https://economia.awesomeapi.com.br/json/all').then((res) => res.json())
      .then((res) => Object.keys(res).filter((key) => key !== 'USDT'))
      .then((res) => this.setState({ currencies: res }));
  }

  formComponentValor(valor) {
    return (
      <label htmlFor="valor">
        Valor:&nbsp;
        <input
          type="text"
          id="valor"
          className="valor"
          name="valor"
          value={ valor }
          onChange={ this.handle }
        />
      </label>
    );
  }

  formComponentMoeda(currencies, moeda) {
    return (
      <label htmlFor="Moeda">
        Moeda:&nbsp;
        <select
          id="Moeda"
          name="moeda"
          value={ moeda }
          onChange={ this.handle }
        >
          {currencies.map((opt, i) => <option key={ i }>{opt}</option>) }
        </select>
      </label>
    );
  }

  formComponentMetodoPagamento(pagamento) {
    return (
      <label htmlFor="Método de pagamento">
        Método de pagamento:&nbsp;
        <select
          id="Método de pagamento"
          name="pagamento"
          value={ pagamento }
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

  formComponentDescricao(descricao) {
    return (
      <label htmlFor="Descrição">
        Descrição:&nbsp;
        <input
          type="text"
          id="Descrição"
          name="descricao"
          value={ descricao }
          onChange={ this.handle }
        />
      </label>
    );
  }

  formComponents() {
    const { currencies } = this.state;
    const { valor, moeda, pagamento, tag, descricao } = this.state;

    return (
      <form className="form">
        {this.formComponentValor(valor)}
        {this.formComponentMoeda(currencies, moeda)}
        {this.formComponentMetodoPagamento(pagamento)}
        {this.formComponentTag(tag)}
        {this.formComponentDescricao(descricao)}
        <button className="btnAddDesp" type="button" onClick={ this.handleClickForm }>
          Adicionar despesa
        </button>
      </form>
    );
  }

  render() {
    const { getLogin } = this.props;
    const { total } = this.state;
    const TOTAL_INIT_VALUE = total; // verificar depois isso
    const CAMBIO_INIT_VALUE = 'BRL'; // NÃO REMOVA
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
              { TOTAL_INIT_VALUE }
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
});

Wallet.propTypes = {
  getLogin: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Wallet);
