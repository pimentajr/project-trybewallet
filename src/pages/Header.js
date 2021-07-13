import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    const { login } = this.props;
    return (
      <header>
        <h1 data-testid="email-field">{ login }</h1>
        <p data-testid="total-field">0</p>
        <p data-testid="header-currency-field">BRL</p>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  login: state.user.email,
});

Header.propTypes = {
  login: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, null)(Header);
