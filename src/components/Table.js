import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Tableadd from './Tableadd';

class Table extends React.Component {
  render() {
    const { expensesStore } = this.props;
    return (
      <table>
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th colSpan="2">Editar/Excluir</th>
          </tr>
        </thead>
        {
          expensesStore
            .map((item, index) => (
              <Tableadd
                key={ index }
                index={ index }
                expenses={ item }
              />
            ))
        }
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  expensesStore: state.wallet.expenses,
});

Table.propTypes = {
  expensesStore: PropTypes.object,
}.isRequired;

export default connect(mapStateToProps)(Table);
