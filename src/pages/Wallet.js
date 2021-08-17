import React from 'react';
import { connect } from 'react-redux';

class Wallet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      totalExpense: 0,
      currentCurrency: 'BRL',
    };
  }

  renderHeader() {
    const { userEmail } = this.props;
    const { totalExpense, currentCurrency } = this.state;
    return (
      <header>
        <p data-testid="email-field">Email: { userEmail }</p>
        <p data-testid="total-field">Despesa Total: { totalExpense }</p>
        <p data-testid="header-currency-field">Câmbio Atual: { currentCurrency }</p>
      </header>
    );
  }

  render() {
    return (
      <div>
        <span>{ this.renderHeader() }</span>
        TrybeWallet
      </div>
    );
  }
}

const mapStateToProps = (state) => ({ 
  userEmail: state.user.email,
});

export default connect(mapStateToProps)(Wallet);