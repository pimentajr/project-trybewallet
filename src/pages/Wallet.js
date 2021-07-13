import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import WalletForm from '../components/WalletForm';

class Wallet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
    };
  }

  render() {
    const { email } = this.props;
    const { value } = this.state;
    return (
      <div>
        <header>
          <h1>TrybeWallet</h1>
          <div data-testid="email-field">{ email }</div>
          <div data-testid="total-field">{ value }</div>
          <div data-testid="header-currency-field"> BRL </div>
        </header>
        <WalletForm />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
});

export default connect(mapStateToProps)(Wallet);

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
};
