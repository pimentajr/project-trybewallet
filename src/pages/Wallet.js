import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Form from '../components/Form';
import { fetchMoeda } from '../actions';

class Wallet extends React.Component {
  componentDidMount() {
    const { thunk } = this.props;
    thunk();
  }

  render() {
    const { username, expenses } = this.props;

    const valor = expenses.reduce((acc, curr) => acc + Number(curr.value)
     * Number(curr.exchangeRates[curr.currency].ask), 0);

    return (
      <div>
        <header data-testid="email-field">
          Olá TrybeWallet
          { username }
          <label htmlFor="expenses">
            Despesas:
            <span data-testid="total-field">{ valor }</span>
            <span data-testid="header-currency-field">BRL</span>
          </label>
        </header>
        <Form />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  username: state.user.email,
  expenses: state.wallet.expenses });

const mapDispatchToProps = (dispatch) => ({
  thunk: () => dispatch(fetchMoeda()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);

Wallet.propTypes = {
  username: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.any).isRequired,
  thunk: PropTypes.func.isRequired,
};

// Requisito 7 e 8 realizado com auxilio dos colegas de turma Alberto Candido e Gabriela Azevedo.
