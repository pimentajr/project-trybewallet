import React from 'react';
import { connect } from 'react-redux';

class WalletHeader extends React.Component {
  render() {
    const { email } = this.props;

    return (
      <header>
        <ul>
          <li data-testid="email-field">{email}</li>
          <li>
            Despesa total: <span data-testid="total-field">0 </span>
            <span data-testid="header-currency-field">BRL</span>
          </li>
        </ul>
      </header>
    );
  }
}

const mapStateToProps = ({ user: { email } }) => ({
  email,
});

export default connect(mapStateToProps)(WalletHeader);
