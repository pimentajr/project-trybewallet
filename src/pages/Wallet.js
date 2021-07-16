import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import FormsWallet from '../components/FormsWallet';

class Wallet extends React.Component {
  render() {
    const { userEmail } = this.props;
    return (
      <div>
        TrybeWallet
        <header>
          <p data-testid="email-field">{`Usuário: ${userEmail} `}</p>
          <p data-testid="total-field">0</p>
          <p data-testid="header-currency-field">BRL</p>
        </header>
        <FormsWallet />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  userEmail: state.user.email,
});

export default connect(mapStateToProps)(Wallet);

Wallet.propTypes = {
  userEmail: PropTypes.string.isRequired,
};
