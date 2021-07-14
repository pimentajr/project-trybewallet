import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import WalletForm from '../components/WalletForm';
import { requestCoins } from '../actions';

class Wallet extends React.Component {
  componentDidMount() {
    const { requestCoinsList } = this.props;
    requestCoinsList();
  }

  totalExpense() {
    const { expenses } = this.props;
    return expenses.reduce((acc, curr) => {
      const value = curr.exchangeRates[curr.currency].ask * curr.value;

      acc += value;

      return acc;
    }, 0);
  }

  renderTable() {
    const { expenses } = this.props;
    const ths = [
      'Descrição',
      'Tag',
      'Método de pagamento',
      'Valor',
      'Moeda',
      'Câmbio utilizado',
      'Valor convertido',
      'Moeda de conversão',
      'Editar/Excluir'];
    return (
      <table>
        <thead>
          <tr>
            { ths.map((word) => <th key={ word }>{ word }</th>) }
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense) => {
            const { name, ask } = expense.exchangeRates[expense.currency];
            return (
              <tr key={ expense.id }>
                <td>{ expense.description }</td>
                <td>{ expense.tag }</td>
                <td>{ expense.method }</td>
                <td>{ parseFloat(expense.value) }</td>
                <td>{ name.split('/')[0] }</td>
                <td>{ (parseFloat(ask)).toFixed(2) }</td>
                <td>{ (parseFloat(ask) * parseFloat(expense.value)).toFixed(2) }</td>
                <td>Real</td>
                <td>Editar/Excluir</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }

  render() {
    const { userEmail } = this.props;
    return (
      <>
        <header>
          <div>
            <div data-testid="email-field">
              {`Email: ${userEmail}`}
            </div>
            <div data-testid="total-field">
              { this.totalExpense() }
            </div>
            <div data-testid="header-currency-field">
              BRL
            </div>
          </div>
        </header>
        <main>
          <WalletForm />
          { this.renderTable() }
        </main>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  userEmail: state.user.email,
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  requestCoinsList: () => dispatch(requestCoins()),
});
Wallet.propTypes = {
  userEmail: PropTypes.string,
  requestCoinsList: PropTypes.func,
}.isRequired;
export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
