import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import FormAddValue from '../component/FormAddValue';
import TableValues from '../component/TableValues';
import { fetchAPI, updateTotal } from '../actions';

class Wallet extends React.Component {
  constructor() {
    super();
    this.updateTotalState = this.updateTotalState.bind(this);
  }

  componentDidMount() {
    const { fetch } = this.props;
    fetch();
  }

  componentDidUpdate() {
    this.updateTotalState();
  }

  updateTotalState() {
    const { itemsTable, totalValue } = this.props;
    const total = itemsTable.reduce((acumulador, valorAtual) => {
      const { value, currency, exchangeRates } = valorAtual;
      const conversao = (parseFloat(value) * exchangeRates[currency].ask);
      return acumulador + conversao;
    }, 0);
    totalValue(Math.round(total * 100) / 100);
  }

  render() {
    const { emailState, total } = this.props;
    return (
      <div>
        <div>
          <h3>
            Usuário:
            {' '}
            <span data-testid="email-field">{ emailState }</span>
          </h3>
          <p>
            Total: R$
            {' '}
            <span data-testid="total-field">{ total }</span>
            {' '}
            <span data-testid="header-currency-field">BRL</span>
          </p>
        </div>
        <FormAddValue />
        <TableValues />
      </div>
    );
  }
}

Wallet.propTypes = {
  itemsTable: PropTypes.arrayOf,
  emailState: PropTypes.string,
  fetch: PropTypes.func,
  totalValue: PropTypes.func,
  total: PropTypes.number,
};

Wallet.defaultProps = {
  itemsTable: {},
  emailState: '',
  fetch: undefined,
  totalValue: undefined,
  total: 0,
};

const mapStateToProps = (state) => ({
  emailState: state.user.email,
  itemsTable: state.wallet.expenses,
  total: state.wallet.total,
});

const mapDispatchToProps = (dispatch) => ({
  fetch: () => dispatch(fetchAPI()),
  totalValue: (state) => dispatch(updateTotal(state)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
