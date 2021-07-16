import React, { Component } from 'react';
import { connect } from 'react-redux';
import { string } from 'prop-types';

class Header extends Component {
  render() {
    const { email } = this.props;
    return (
      <header>
        <h2 className="header-title" data-testid="email-field">{ email }</h2>
        <p className="header-field" data-testid="total-field">0</p>
        <p className="header-field" data-testid="header-currency-field">BRL</p>
      </header>
    );
  }
}

Header.propTypes = {
  email: string,
}.isRequired;

const propsMapState = ({ user: { email } }) => ({
  email,
});

export default connect(propsMapState, null)(Header);
