import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  constructor() {
    super();
    this.state = {
      total: 0,
    };
  }

  render() {
    const { login } = this.props;
    const { total } = this.state;
    return (
      <header>
        <h2 data-testid="email-field">{ login }</h2>
        <h3 data-testid="header-currency-field">
          Valor de despesas: R$
          <div data-testid="total-field">
            { total }
          </div>
          BRL
        </h3>
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
