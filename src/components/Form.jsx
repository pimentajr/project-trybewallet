import React, { Component } from 'react';
import { connect } from 'react-redux';

class Form extends Component {
  render() {
    const { moeda } = this.props;
    return (
      <div>
        <form>
          <label htmlFor="valor">
            Valor
            <input type="number" id="valor" />
          </label>
          <label htmlFor="descricao">
            Descrição
            <input type="text" id="descricao" />
          </label>
          <label htmlFor="moeda">
            Moeda
            <select id="moeda">
              {moeda.map((value, index) => <option key={ index }>{value}</option>)}
            </select>
          </label>
          <label htmlFor="metodo-pag">
            Método de Pagamento
            <select id="metodo-pag">
              <option>Dinheiro</option>
              <option>Cartão de Crédito</option>
              <option>Cartão de Débito</option>
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
      </div>
    );
  }
}



const mapStateToProps = (state) => ({
  moeda: state.wallet.currencies,
});

export default connect(mapStateToProps)(Form);
