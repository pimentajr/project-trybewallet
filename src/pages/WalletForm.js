import React from 'react';
import { connect } from 'react-redux';
import { fetchMoedas } from '../actions';

class WalletForm extends React.Component {
  componentDidMount() {
    const { dispatchFetchMoedas } = this.props;
    dispatchFetchMoedas();
  }

  render() {
    const { currencies } = this.props;

    return (
      <form>
        <label htmlFor="valor">
          Valor:
          <input id="valor" />
        </label>
        <label htmlFor="descricao">
          Descrição:
          <input id="descricao" />
        </label>
        <label htmlFor="moeda">
          Moeda:
          <select id="moeda">
            { currencies.map((sigla, index) => <option key={ index } value= { sigla }> {sigla}</option>)}
          </select>
        </label>
        <label htmlFor="pagamento">
          Método de Pagamento:
          <select id="pagamento">
            <option>Dinheiro</option>
            <option>Cartão de crédito</option>
            <option>Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="tag">
          Tag
          <select id="tag">
            <option>Alimentação</option>
            <option>Lazer</option>
            <option>Trabalho</option>
            <option>Transporte</option>
            <option>Saúde</option>
          </select>
        </label>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchFetchMoedas: (state) => dispatch(fetchMoedas(state)),
});

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);
