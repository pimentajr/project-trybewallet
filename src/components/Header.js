import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends React.Component {
  render() {
    const { email, total } = this.props;
    return (
      <header>
        <div>TrybeWallet</div>
        <span data-testid="email-field">{ `Email: ${email}` }</span>
        <span data-testid="total-field">{total ? Number(total).toFixed(2) : 0}</span>
        <span data-testid="header-currency-field">BRL</span>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  total: state.wallet.total,
});

export default connect(mapStateToProps)(Header);

Header.propTypes = {
  email: PropTypes.string.isRequired,
  total: PropTypes.number.isRequired,
};
