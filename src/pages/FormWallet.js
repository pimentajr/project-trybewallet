import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchCoins } from '../actions';

class FormWallet extends Component {
  componentDidMount() {
    const { dispatchFetchCoins } = this.props;
    dispatchFetchCoins();
  }

  render() {
    const { currencies } = this.props;
    return (
      <form>
        <label htmlFor="valor">
          Valor:
          <input id="valor" />
        </label>
        <label htmlFor="descrição">
          Descrição:
          <input id="descrição" />
        </label>
        <label htmlFor="moeda">
          Moeda:
          <select id="moeda">
            { currencies.map((item, index) => (
              <option key={ index } value={ item }>{ item }</option>)) }
          </select>
        </label>
        <label htmlFor="pagamento">
          Método de pagamento:
          <select id="pagamento">
            <option>Dinheiro</option>
            <option>Cartão de Crédito</option>
            <option>Cartão de Débito</option>
          </select>
        </label>
        <label htmlFor="tag">
          Tag:
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

FormWallet.propTypes = {
  dispatchFetchCoins: PropTypes.string.isRequired,
  currencies: PropTypes.string.isRequired,
};

const mapStatToProps = (state) => ({
  currencies: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchFetchCoins: (state) => dispatch(fetchCoins(state)),
});

export default connect(mapStatToProps, mapDispatchToProps)(FormWallet);
