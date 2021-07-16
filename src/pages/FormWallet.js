import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchCoins, fetchCoinsOnApi } from '../actions';
import CurrentType from '../components/CurrentType';

class FormWallet extends Component {
  componentDidMount() {
    const { dispatchFetchCoins, fetchCurrent } = this.props;
    dispatchFetchCoins();
    fetchCurrent();
  }

  render() {
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
            <CurrentType />
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
  dispatchFetchCoins: PropTypes.func.isRequired,
  fetchCurrent: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  dispatchFetchCoins: (state) => dispatch(fetchCoins(state)),
  fetchCurrent: () => dispatch(fetchCoinsOnApi()),
});

export default connect(null, mapDispatchToProps)(FormWallet);
