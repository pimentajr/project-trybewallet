import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchCoinsAPI, addExpense } from '../actions';

class FormsWallet extends React.Component {
  constructor() {
    super();

    this.state = {
      value: 0,
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    };

    this.handleChange = this.handleChange.bind(this);
    this.buttonAddExpense = this.buttonAddExpense.bind(this);
  }

  componentDidMount() {
    const { fetchAPI } = this.props;
    fetchAPI();
  }

  handleChange({ target }) {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    this.setState({
      [name]: value,
    });
  }

  buttonAddExpense(state, fetch, setExpense) {
    return (
      <button
        type="button"
        onClick={ () => setExpense(state, fetch) }
      >
        Adicionar despesa
      </button>
    );
  }

  render() {
    const { coinsData, setExpense, fetchAPI } = this.props;
    let siglas = [];
    if (coinsData !== undefined) {
      delete coinsData.USDT;
      siglas = Object.keys(coinsData);
    }
    return (
      <form>
        <label htmlFor="valor">
          Valor:
          <input id="valor" type="text" name="value" onChange={ this.handleChange } />
        </label>
        <label htmlFor="moeda">
          Moeda:
          <select id="moeda" name="currency" onChange={ this.handleChange }>
            {siglas.map((sigla, index) => (
              <option key={ index } value={ sigla }>
                {sigla}
              </option>
            ))}
          </select>
        </label>
        <label htmlFor="pagamento">
          Método de Pagamento:
          <select id="pagamento" name="method" onChange={ this.handleChange }>
            <option>Dinheiro</option>
            <option>Cartão de crédito</option>
            <option>Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="tag">
          Tag:
          <select id="tag" name="tag" onChange={ this.handleChange }>
            <option>Alimentação</option>
            <option>Lazer</option>
            <option>Trabalho</option>
            <option>Transporte</option>
            <option>Saúde</option>
          </select>
        </label>
        <label htmlFor="des">
          Descrição:
          <input id="des" type="text" name="description" onChange={ this.handleChange } />
        </label>
        {this.buttonAddExpense(this.state, fetchAPI, setExpense)}
      </form>
    );
  }
}

const mapStateToProps = ({ wallet: { coinsData } }) => ({
  coinsData,
});

const mapDispatchToProps = (dispatch) => ({
  setExpense: (data, fetch) => {
    fetch();
    dispatch(addExpense(data));
  },
  fetchAPI: () => dispatch(fetchCoinsAPI()),
});

export default connect(mapStateToProps, mapDispatchToProps)(FormsWallet);

FormsWallet.propTypes = {
  fetchAPI: PropTypes.func.isRequired,
  coinsData: PropTypes.arrayOf(PropTypes.string),
  setExpense: PropTypes.func.isRequired,
};

FormsWallet.defaultProps = {
  coinsData: ['USD', 'USDT'],
};
