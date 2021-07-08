import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import emailAssignment from '../actions';

class FormsWallet extends React.Component {
  render() {
    const { email } = this.props;

    return (
      <form>
        <label>
          Valor: <input type="text" />
        </label>
        <label>
          Moeda: <select></select>
        </label>
        <label>
          Método de Pagamento:{' '}
          <select>
            <option value="dinheiro">Dinheiro</option>
            <option value="credito">Cartão de crédito</option>
            <option value="debito">Cartão de débito</option>
          </select>
        </label>
        <label>
          Tag:{' '}
          <select>
            <option value="alimentacao">Alimentação</option>
            <option value="lazer">Lazer</option>
            <option value="trabalho">Trabalho</option>
            <option value="transporte">Transporte</option>
            <option value="saude">Saúde</option>
          </select>
        </label>
        <label>
          Descrição: <input type="text" />
        </label>
      </form>
    );
  }
}

const mapStateToProps = ({ user: { email } }) => ({
  email,
});

export default connect(mapStateToProps)(FormsWallet);
