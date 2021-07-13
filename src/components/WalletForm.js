import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchCurrencies } from '../actions';

class WalletForm extends Component {
  componentDidMount() {
    const { fetchCur } = this.props;
    fetchCur();
  }

  render() {
    const { cur } = this.props;
    return (
      <form>
        <label htmlFor="value">
          Valor:
          <input
            type="number"
            name="valor"
            id="value"
          />
        </label>
        <label htmlFor="description">
          Descrição:
          <input
            type="text"
            id="description"
            name="Descrição"
          />
        </label>
        <label htmlFor="currency">
          Moeda:
          <select id="currency">
            { cur.map((value, index) => <option key={ index }>{ value }</option>)}
          </select>
        </label>
        <label htmlFor="payment">
          Método de pagamento:
          <select id="payment">
            <option value="dinheiro">Dinheiro</option>
            <option value="credito">Cartão de crédito</option>
            <option value="debito">Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="tag">
          Tag:
          <select id="tag">
            <option value="alimentacao">Alimentação</option>
            <option value="lazer">Lazer</option>
            <option value="trabalho">Trabalho</option>
            <option value="transporte">Transporte</option>
            <option value="saude">Saúde</option>
          </select>
        </label>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchCur: () => dispatch(fetchCurrencies()),
});
const mapStateToProps = (state) => ({
  cur: state.wallet.currencies,
});

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);

WalletForm.propTypes = {
  fetchCur: PropTypes.func.isRequired,
  cur: PropTypes.arrayOf.isRequired,
};
