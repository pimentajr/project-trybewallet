import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchCurrencies } from '../actions';
import WalletCurr from './WalletCurr';

class form extends React.Component {
  componentDidMount() {
    const { fetchCurr } = this.props;
    fetchCurr();
  }

  render() {
    return (
      <div>
        <form>
          <label htmlFor="value">
            Valor:
            <input type="number" name="value" id="value" />
          </label>
          <label htmlFor="currency">
            Moeda:
            <select id="currency">
              <WalletCurr />
            </select>
          </label>
          <label htmlFor="payment">
            Método de Pagamento:
            <select id="payment">
              <option value="money">Dinheiro</option>
              <option value="credit">Cartão de crédito</option>
              <option value="debit">Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="tag">
            tag:
            <select id="tag">
              <option value="food">Alimentação</option>
              <option value="leisure">Lazer</option>
              <option value="work">Trabalho</option>
              <option value="transport">Transporte</option>
              <option value="health">Saúde</option>
            </select>
          </label>
          <label htmlFor="description">
            Descrição:
            <input
              type="text"
              name="description"
              id="description"
              value="description"
              placeholder="Descrição"
            />
          </label>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchCurr: () => dispatch(fetchCurrencies()),
});

form.propTypes = {
  fetchCurr: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(form);
