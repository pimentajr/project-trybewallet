import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import WalletForm from '../components/WalletForm';

class Wallet extends React.Component {
  constructor() {
    super();
    this.state = {
      expenses: 0,
    };
  }

  render() {
    const { userEmail } = this.props;
    const { expenses } = this.state;
    return (
      <div>
        <div>Pagina do wallet</div>
        <header>
          <div data-testid="email-field">{ `E-mail: ${userEmail}` }</div>
          <div data-testid="total-field">{`Total das despesas: ${expenses}`}</div>
          <div data-testid="header-currency-field"> BRL </div>
        </header>
        <WalletForm />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  userEmail: state.user.email,
});

Wallet.propTypes = {
  userEmail: PropTypes.string,
}.isRequired;
export default connect(mapStateToProps)(Wallet);
