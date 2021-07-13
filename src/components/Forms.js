import { connect } from 'react-redux';
import React from 'react';

class Forms extends React.Component {
  render() {
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
          Moeda
          <select id="Moeda">
            <option>USD</option>
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
});

export default connect(mapStateToProps)(Forms);
