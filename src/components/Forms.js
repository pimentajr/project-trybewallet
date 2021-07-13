import { connect } from 'react-redux';
import React from 'react';
import PropTypes from 'prop-types';
import { fetchValues } from '../actions/index';

class Forms extends React.Component {
  componentDidMount() {
    const { fetch } = this.props;
    fetch();
  }

  render() {
    const { currencies } = this.props;
    return (
      <form>
        <label htmlFor="Valor">
          Valor
          <input
            id="Valor"
            type="text"
          />
        </label>
        <label htmlFor="Descrição">
          Descrição
          <input
            id="Descrição"
            type="text"
          />
        </label>
        <label htmlFor="Moeda">
          Moeda:
          <select id="Moeda">
            {
              Object.values(currencies).filter((item) => item.codein !== 'BRLT')
                .map((e, index) => <option key={ index }>{e.code}</option>)
            }
          </select>
        </label>
        <label htmlFor="Metodo-Pagamento">
          Método de pagamento
          <select id="Metodo-Pagamento">
            <option>Dinheiro</option>
            <option>Cartão de crédito</option>
            <option>Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="tag">
          Tag
          <select name="tag" id="tag">
            <option name="alimentação" value="alimentação">alimentação</option>
            <option name="lazer" value="lazer">lazer</option>
            <option name="trabalho" value="trabalgo">trabalho</option>
            <option name="transporte" value="transporte">transporte</option>
            <option name="saúde" value="saúde">saúde</option>
          </select>
        </label>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  currencies: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  fetch: (state) => dispatch(fetchValues(state)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Forms);

Forms.propTypes = {
  fetch: PropTypes.func,
  currencies: PropTypes.objectOf(PropTypes.object),
}.isRequired;
