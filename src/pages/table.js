import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Thead from './Thead';
import { addUserSpending } from '../actions';

class table extends React.Component {
  constructor(props) {
    super(props);
    // this.newState = this.newState.bind(this);
    console.log('');
  }

  // newState({ target }) {
  //   const { id } = target;
  //   const { tableList, addSpending } = this.props;

  //   const changeValues = tableList.filter((item) => item.id !== id);

  // }

  render() {
    const { tableList } = this.props;
    return (
      <div>
        <table>
          <Thead />
          <tbody>
            {tableList.map((item) => (
              <tr key={ item.id }>
                <td>{item.description}</td>
                <td>{item.tag}</td>
                <td>{item.method}</td>
                <td>{item.value}</td>
                <td>{(item.exchangeRates[item.currency].name).split('/')[0]}</td>
                <td>{parseFloat(item.exchangeRates[item.currency].ask).toFixed(2)}</td>
                <td>
                  {parseFloat(item.exchangeRates[item.currency].ask * item.value)
                    .toFixed(2)}
                </td>
                <td>
                  Real
                </td>
                <td>
                  <button type="button" data-testid="edit-btn">Editar</button>
                </td>
                <td>
                  <button
                    id={ item.id }
                    type="button"
                    data-testid="delete-btn"
                    onClick={ this.newState }
                  >
                    Excluir
                  </button>
                </td>
              </tr>))}
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  tableList: state.wallet.expenses,
// tableCoin: state.spending.exchangeRates,
});

const mapDispatchToProps = (dispatch) => ({
  addSpending: (payload) => dispatch(addUserSpending(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(table);

table.propTypes = {
  map: PropTypes.func,
  tableList: PropTypes.arrayOf,
}.isRequired;
