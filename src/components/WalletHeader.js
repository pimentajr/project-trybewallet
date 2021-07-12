import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Head extends Component {
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
        <p1 data-testid="email-field">
          Email:
          {email}
        </p1>
        <p1 data-testid="total-field">
          Total:
          { total }
        </p1>
        <p1 data-testid="header-currency-field">
          BRL
        </p1>
      </header>
    );
  }
}
Head.propTypes = {
  email: PropTypes.string.isRequired,
};
export default Head;
