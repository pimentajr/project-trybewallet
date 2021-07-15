import React from 'react';
import { connect } from 'react-redux';
import { fetchMoedas, montarExpense } from '../actions';

class WalletForm extends React.Component {
  constructor() {
    super();
    this.state = {
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      id: 0,
    };
    this.inputHandle = this.inputHandle.bind(this);
  }

  componentDidMount() {
    const { dispatchFetchMoedas } = this.props;
    dispatchFetchMoedas();
  }

  inputHandle({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  render() {
    const { currencies, dispatchFetchMoedas, dispatchMountExpense, exchange } = this.props;
    const { value, description, currency, method, tag } = this.state;
    return (
      <form>
        <label htmlFor="value">
          Valor:
          <input id="value" name='value' value={ value } onChange={ this.inputHandle } />
        </label>
        <label htmlFor="description">
          Descrição:
          <input id="description" name='description' value={ description } onChange={ this.inputHandle } />
        </label>
        <label htmlFor="currency">
          Moeda:
          <select id="currency" name='currency' value={ currency } onChange={ this.inputHandle }>
            { currencies.map((sigla, index) => <option key={ index } value= { sigla }> {sigla}</option>)}
          </select>
        </label>
        <label htmlFor="method">
          Método de Pagamento:
          <select id="method" name='method' value={ method } onChange={ this.inputHandle }>
            <option>Dinheiro</option>
            <option>Cartão de crédito</option>
            <option>Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="tag">
          Tag
          <select id="tag" name='tag' value={ tag } onChange={ this.inputHandle }>
            <option value='Alimentação'>Alimentação</option>
            <option value='Lazer'>Lazer</option>
            <option value='Trabalho'>Trabalho</option>
            <option value='Transporte'>Transporte</option>
            <option value='Saúde'>Saúde</option>
          </select>
        </label>
        <button type='button' onClick={ () => {
          dispatchFetchMoedas();
          dispatchMountExpense({ ...this.state, exchangeRates: exchange });
          this.setState((previousState) => ({
            value: '',
            description: '',
            currency: 'USD',
            method: 'Dinheiro',
            tag: 'Alimentação',
            id: previousState.id + 1,
          }))
          }} 
        >Adicionar despesa</button>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  exchange: state.wallet.exchange,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchFetchMoedas: (state) => dispatch(fetchMoedas(state)),
  dispatchMountExpense: (state) => dispatch(montarExpense(state)),
});

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);
