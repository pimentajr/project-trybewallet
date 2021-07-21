import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';

class Header extends Component {
  render() {
    const { email } = this.props;
    const total = 0;
    return (
      <div>
        <header data-testid="email-field">{ email }</header>
        <h4 data-testid="total-field">{ total }</h4>
        <h4 data-testid="header-currency-field">BRL</h4>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
});

Header.propTypes = {
  email: propTypes.string,
}.isRequired;

export default connect(mapStateToProps)(Header);
