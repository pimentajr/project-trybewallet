import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class ExpenseForm extends React.Component {
  render() {
    const { currency } = this.props;
    return (
      <section>
        <form id="xpenc-form">
          <label htmlFor="xpenc-form">
            Valor
            <input type="text" name="valor" />
          </label>
          <label htmlFor="xpenc-form">
            Descrição
            <input type="text" name="descricao" />
          </label>
          <label htmlFor="xpenc-form">
            Moeda
            {console.log(currency)}
            <select>
              {currency
                .map((item, index) => (
                  <option value={ item } key={ index }>{item}</option>))}
            </select>
          </label>
          <label htmlFor="xpenc-form">
            Método de pagamento
            <select>
              <option value="dinheiro">Dinheiro</option>
              <option value="credito">Cartão de crédito</option>
              <option value="debito">Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="xpenc-form">
            Tag
            <select>
              <option value="alimentacao">Alimentação</option>
              <option value="lazer">Lazer</option>
              <option value="trabalho">Trabalho</option>
              <option value="transporte">Transporte</option>
              <option value="saude">Saúde</option>
            </select>
          </label>
        </form>
        <Link to="/">
          <button type="button">Voltar</button>
        </Link>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  currency: state.currency.currency,
});

ExpenseForm.propTypes = {
  currency: PropTypes.arrayOf,
}.isRequired;

export default connect(mapStateToProps)(ExpenseForm);
