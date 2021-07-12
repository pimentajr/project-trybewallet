import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Wallet extends React.Component {
  render() {
    const { getLogin } = this.props;
    const TOTAL_INIT_VALUE = 0; // remover depois
    const CAMBIO_INIT_VALUE = 'BRL'; // remover depois
    return (
      <div>
        <div className="walletHeader">
          <h3>TrybeWallet</h3>
          <div className="walletHeaderRight">
            <span className="email" data-testid="email-field">
              { getLogin }
            </span>
            <span className="total" data-testid="total-field">
              Total:
              { TOTAL_INIT_VALUE }
            </span>
            <span data-testid="header-currency-field">
              { CAMBIO_INIT_VALUE }
            </span>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  getLogin: state.user.email,
});

Wallet.propTypes = {
  getLogin: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Wallet);
