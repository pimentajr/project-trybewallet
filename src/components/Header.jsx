import React, { Component } from 'react';
import { connect } from 'react-redux';

class Header extends Component {
  constructor() {
    super();
    this.state = {
      total: 0,
    };
  }

  render() {
    const { email } = this.props;
    const { total } = this.state;
    return (
      <header>
        <p data-testid="email-field">{ email }</p>
        <p data-testid="total-field"> { total } </p>
        <p data-testid="header-currency-field"> BRL </p>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
});

export default connect(mapStateToProps)(Header);
