import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    const { emailReducer } = this.props;
    return (
      <header>
        <h2 data-testid="email-field">{ emailReducer }</h2>
        <h3 data-testid="header-currency-field">
          despesa total:
          <span data-testid="total-field">0</span>
          BRL
        </h3>
      </header>
    );
  }
}

const mapStatetoProps = (state) => ({
  emailReducer: state.user.email,
});

Header.propTypes = ({
  emailReducer: PropTypes.string,
}).isRequired;

export default connect(mapStatetoProps)(Header);
