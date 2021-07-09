import React from 'react';
import { connect } from 'react-redux';

class WalletHeader extends React.Component {
  constructor(){
    super();
    this.totalValue = this.totalValue.bind(this);
  }

  totalValue() {
    const { expenses } = this.props;
    let result = 0;
    
    expenses.forEach(({ exchangeRates, currency, value }) => {
      result += exchangeRates[currency].ask * value; 
    });
    
    return result;
  }

  render() {
    const { email } = this.props;
    const totValue = parseFloat(this.totalValue().toFixed(2))

    return (
      <header>
        <ul>
          <li data-testid="email-field">{email}</li>
          <li>
            Despesa total: <span data-testid="total-field">{ totValue }</span>
            <span data-testid="header-currency-field">BRL</span>
          </li>
        </ul>
      </header>
    );
  }
}

const mapStateToProps = ({ user: { email }, wallet: { expenses } }) => ({
  email,
  expenses
});

export default connect(mapStateToProps)(WalletHeader);
