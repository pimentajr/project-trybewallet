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
        <span data-testid="email-field">
          Email:
          {email}
        </span>
        <span data-testid="total-field">
          Total:
          { total }
        </span>
        <span data-testid="header-currency-field">
          BRL
        </span>
      </header>
    );
  }
}
Head.propTypes = {
  email: PropTypes.string.isRequired,
};
export default Head;
