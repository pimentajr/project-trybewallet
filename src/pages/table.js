import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class table extends React.Component {
  constructor(props) {
    super(props);
    console.log('');
  }

  render() {
    const { tableList } = this.props;
    console.log(tableList);
    return (
      <div>
        <table>
          <thead>
            <tr className="titles">
              <th className="column"> Descrição </th>
              <th className="column"> Tag </th>
              <th className="column"> Método de pagamento </th>
              <th className="column">Valor </th>
              <th className="column"> Moeda </th>
              <th className="column"> Câmbio utilizado </th>
              <th className="column"> Valor convertido </th>
              <th className="column"> Moeda de conversão </th>
              <th className="column"> Editar/Excluir </th>
            </tr>
          </thead>
          <tr>
            {tableList.map((item) => (
              <>
                <td key={ item.id }>{item.descricao}</td>
                <td>{item.tag}</td>
                <td>{item.pagamento}</td>
                <td>{item.valor}</td>
                <td>{item.moeda}</td>
                <td>{item.cambio}</td>
                <td>{item.convertedValue}</td>
                <td>Editar/Excluir</td>

              </>))}
          </tr>
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  tableList: state.spending.spending,
});

export default connect(mapStateToProps)(table);

table.propTypes = {
  map: PropTypes.func,
  tableList: PropTypes.arrayOf,
}.isRequired;
