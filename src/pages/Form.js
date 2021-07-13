import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchCoins } from '../actions';

import InitialCoins from '../components/InitialCoins';

class Form extends React.Component {
  componentDidMount() {
    const { sendCoins } = this.props;
    return sendCoins();
  }

  render() {
    return (
      <form>
        <label htmlFor="value-input">
          Valor
          <input type="text" name="value" id="value-input" />
        </label>
        <label htmlFor="description-input">
          Descrição
          <input type="text" name="description" id="description-input" />
        </label>
        <label htmlFor="coin-input">
          Moeda
          <select id="coin-input">
            <InitialCoins />
          </select>
        </label>

        <label htmlFor="pay-input">
          Método de pagamento
          <select id="pay-input">
            <option>Dinheiro</option>
            <option>Cartão de crédito</option>
            <option>Cartão de débito</option>
          </select>
        </label>

        <label htmlFor="tag-input">
          Tag
          <select id="tag-input">
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

const mapDispatchToProps = (dispatch) => ({
  sendCoins: () => dispatch(fetchCoins()),
});

Form.propTypes = ({
  askCoin: PropTypes.arrayOf,
}).isRequired;

export default connect(null, mapDispatchToProps)(Form);
