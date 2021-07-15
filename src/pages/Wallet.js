import React from 'react';
import { connect } from 'react-redux';
import Form from '../components/Form';

class Wallet extends React.Component {
  render() {
    const { email } = this.props;
    // console.log(email);
    return (
      <div>
        TrybeWallet
        <header>
          <span data-testid="email-field">{ email }</span>
          <p>
            <span data-testid="total-field">0</span>
          </p>
          <p>
            <span data-testid="header-currency-field">BRL</span>
          </p>
        </header>
        <Form />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
});

export default connect(mapStateToProps)(Wallet);
