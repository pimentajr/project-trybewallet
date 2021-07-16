import React, { Component } from 'react';
import { connect } from 'react-redux';
import { string, number } from 'prop-types';

class Header extends Component {
  render() {
    const { email, total } = this.props;
    const initial = 0;
    return (
      <header>
        <h2 className="header-title" data-testid="email-field">{ email }</h2>
        <p className="header-field" data-testid="total-field">
          {!total ? initial.toFixed(2) : total.toFixed(2)}
        </p>
        <p className="header-field" data-testid="header-currency-field">BRL</p>
      </header>
    );
  }
}

Header.propTypes = {
  email: string,
  total: number,
}.isRequired;

const propsMapState = ({ user: { email }, wallet: { total } }) => ({
  email,
  total,
});

export default connect(propsMapState, null)(Header);
