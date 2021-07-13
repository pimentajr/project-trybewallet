import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchCurr } from '../actions';

class Wallet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      valor: '',
      descricao: '',
      moeda: 'USD',
      pagamento: 'Dinheiro',
      tag: 'Alimentação',
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    const { getDataCurr } = this.props;
    getDataCurr();
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  renderValor() {
    const { valor } = this.state;
    return (
      <label htmlFor="value">
        Valor
        <input
          type="number"
          name="value"
          id="value"
          value={ valor }
          onChange={ this.handleChange }
        />
      </label>
    );
  }

  renderDescricao() {
    const { descricao } = this.state;
    return (
      <label htmlFor="description">
        Descrição
        <input
          type="text"
          name="description"
          id="description"
          value={ descricao }
          onChange={ this.handleChange }
        />
      </label>
    );
  }

  renderMoeda() {
    const { moeda } = this.state;
    const { currencies } = this.props;
    return (
      <label htmlFor="currency">
        Moeda
        <select
          role="combobox"
          type="text"
          name="currency"
          id="currency"
          value={ moeda }
          onChange={ this.handleChange }
        >
          {currencies.map((item) => (
            <option key={ item }>
              { item }
            </option>))}
        </select>
      </label>
    );
  }

  renderPagamento() {
    const { pagamento } = this.state;
    return (
      <label htmlFor="payment">
        Método de pagamento
        <select
          role="combobox"
          type="text"
          name="payment"
          id="payment"
          value={ pagamento }
          onChange={ this.handleChange }
        >
          <option>Dinheiro</option>
          <option>Cartão de crédito</option>
          <option>Cartão de débito</option>
        </select>
      </label>
    );
  }

  renderTag() {
    const { tag } = this.state;
    return (
      <label htmlFor="tag">
        Tag
        <select
          role="combobox"
          type="text"
          name="tag"
          id="tag"
          value={ tag }
          onChange={ this.handleChange }
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

  render() {
    const { email } = this.props;
    return (
      <div>
        <header>
          <h2 data-testid="email-field">{ email }</h2>
          <span data-testid="total-field">0</span>
          <p data-testid="header-currency-field">BRL</p>
        </header>
        <form type="submit">
          {this.renderValor()}
          {this.renderDescricao()}
          {this.renderMoeda()}
          {this.renderPagamento()}
          {this.renderTag()}

        </form>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  email: state.user.email,
  currencies: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  getDataCurr: () => dispatch(fetchCurr()),
});

Wallet.propTypes = {
  email: PropTypes.string,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
// terminar o wallet falta usar o componentDiiMount e passar os dados para dentro do render
