import React from 'react';
import { connect } from 'react-redux';

class WalletHeader extends React.Component {
  render() {
    const { email, total = 0 } = this.props;
    //console.log(total);

    return (
      <header>
        <ul>
          <li data-testid="email-field">{email}</li>
          <li>
            Despesa total: <span data-testid="total-field">{ total }</span>
            <span data-testid="header-currency-field">BRL</span>
          </li>
        </ul>
      </header>
    );
  }
}

const mapStateToProps = ({ user: { email }, wallet: { total } }) => ({
  email,
  total
});

export default connect(mapStateToProps)(WalletHeader);
