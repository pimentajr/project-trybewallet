import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Form from '../Components/Form';
import ExpenseTable from '../Components/ExpenseTable';

class Wallet extends React.Component {
  render() {
    const { email } = this.props;
    return (
      <div>
        <header className="headerWallet">
          <h1>TrybeWallet</h1>
          <h3>
            Seja bem vindo:
            <span data-testid="email-field">{email}</span>
          </h3>
          <h5 data-testid="total-field">
            Despesa total: 0
          </h5>
          <span data-testid="header-currency-field">BRL</span>
        </header>
        <section>
          <Form />
          <ExpenseTable />
        </section>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
});

export default connect(mapStateToProps)(Wallet);

Wallet.propTypes = {
  email: PropTypes.string,
  expenses: PropTypes.array,
}.isRequired;
