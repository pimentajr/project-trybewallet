import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { walletCurrencies, deleting } from '../actions';
import '../index.css';

class Table extends Component {
  constructor(props) {
    super(props);

    this.updateTable = this.updateTable.bind(this);
    this.deleteButton = this.deleteButton.bind(this);
  }

  deleteButton(e) {
    const { toDelete } = this.props;
    return (
      <button
        data-testid="delete-btn"
        type="button"
        onClick={ () => toDelete(e) }
      >
        Excluir
      </button>
    );
  }

  updateTable() {
    const { fromWallet } = this.props;
    return (
      fromWallet.map((e, i) => {
        const { id, description, tag, method, value, exchangeRates, currency } = e;
        const na = exchangeRates[currency].name;
        const ca = exchangeRates[currency].ask;
        const magicN = -2;
        const caConv = Math.round((parseFloat(ca) * 100), magicN) / 100;
        const val = (Math.round((value * 100), magicN) / 100);
        const co = (parseFloat(val) * parseFloat(ca));
        return (
          <tbody key={ i }>
            <tr>
              <td>{description}</td>
              <td>{tag}</td>
              <td>{method}</td>
              <td>
                {value}
              </td>
              <td>{(na.split('/', 1)[0]).toUpperCase()}</td>
              <td>{caConv}</td>
              <td>{(Math.round((co * 100), magicN) / 100)}</td>
              <td>Real</td>
              <td>{this.deleteButton([id, value])}</td>
            </tr>
          </tbody>
        );
      })
    );
  }

  render() {
    return (
      <table className="tableHead">
        <thead>
          <tr>
            <th className="description">Descrição</th>
            <th className="value">Tag</th>
            <th className="description">Método de pagamento</th>
            <th className="value">Valor</th>
            <th className="description">Moeda</th>
            <th className="value">Câmbio utilizado</th>
            <th className="value">Valor convertido</th>
            <th className="description">Moeda de conversão</th>
            <th className="value">Editar/Excluir</th>
          </tr>
        </thead>
        { this.updateTable() }
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  fromWallet: state.wallet.expenses,
  fromCurrencies: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  toCurrency: (payload) => dispatch(walletCurrencies(payload)),
  toDelete: (payload) => dispatch(deleting(payload)),
});

Table.propTypes = {
  fromWallet: PropTypes.arrayOf(PropTypes.object).isRequired,
  toDelete: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Table);
