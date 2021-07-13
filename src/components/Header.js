import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    const { userData } = this.props;
    return (
      <header>
        <h2 data-testid="email-field">{ userData || 'name'}</h2>
        <h2 data-testid="total-field">0</h2>
        <h2 data-testid="header-currency-field">BRL</h2>
      </header>
    );
  }
}
Header.propTypes = {
  userData: PropTypes.string,
}.isRequired;

const mapToStateProps = (state) => ({
  userData: state.user.email,
});

export default connect(mapToStateProps)(Header);
