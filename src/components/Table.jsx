import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deletaDespesas } from '../actions';
// import ButtonDelete from './ButtonDelete';

// Lógica de inserção das informações no header e
// botão de deletar despesas desenvolvida
// com a ajuda do Lucas Martins - Turma 10 - Tribo B.

class Table extends React.Component {
  constructor() {
    super();
    this.deleteDespesa = this.deleteDespesa.bind(this);
    this.renderizaTr = this.renderizaTr.bind(this);
  }

  deleteDespesa(id) {
    const { delDespesas } = this.props;
    delDespesas(id);
  }

  renderizaTr() {
    return (
      <tr>
        <th>Descrição</th>
        <th>Tag</th>
        <th>Método de pagamento</th>
        <th>Valor</th>
        <th>Moeda</th>
        <th>Câmbio utilizado</th>
        <th>Valor convertido</th>
        <th>Moeda de conversão</th>
        <th>Editar/Excluir</th>
      </tr>
    );
  }

  render() {
    const { expensesFromState } = this.props;
    return (
      <div>
        <table>
          <thead>
            {this.renderizaTr()}
          </thead>
          <tbody>
            { expensesFromState.map((expensesItens) => (
              <tr key={ expensesItens.id }>
                <td>{ expensesItens.description }</td>
                <td>{ expensesItens.tag }</td>
                <td>{ expensesItens.method }</td>
                <td>{ expensesItens.value }</td>
                <td>{ expensesItens.exchangeRates[expensesItens.currency].name }</td>
                <td>
                  {
                    Number(parseFloat(expensesItens
                      .exchangeRates[expensesItens.currency]
                      .ask).toFixed(2))
                  }
                </td>
                <td>
                  {
                    (Number(expensesItens
                      .exchangeRates[expensesItens.currency].ask)
                      * Number(expensesItens.value)).toFixed(2)
                  }
                </td>
                <td>Real</td>
                <td>
                  <button
                    type="button"
                    data-testid="delete-btn"
                    onClick={ () => this.deleteDespesa(expensesItens.id) }
                  >
                    Deletar despesa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  expensesFromState: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  delDespesas: (id) => dispatch(deletaDespesas(id)),
});

Table.propTypes = {
  expensesFromState: PropTypes.arrayOf(PropTypes.object).isRequired,
  delDespesas: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Table);
