import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
  constructor() {
    super();
    this.state = {
      valorTotal: 0,
    };
  }

  render() {
    const { login } = this.props;
    const { valorTotal } = this.state;
    return (
      <header>
        <h3 data-testid="email-field">{ login }</h3>
        <h4 data-testid="header-currency-field">
          Despesa total: R$
          <span key="login" data-testid="total-field">
            { valorTotal }
          </span>
          BRL
        </h4>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  login: state.user.email,
});

Header.propTypes = ({
  login: PropTypes.string,
}).isRequired;

export default connect(mapStateToProps, null)(Header);
