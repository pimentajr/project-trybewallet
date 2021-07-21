import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const { emailStoreGet } = this.props;
    return (
      <header>
        <h4>Name</h4>
        <span data-testid="email-field">{ emailStoreGet }</span>
        <h5>
          <span data-testid="total-field">0</span>
        </h5>
        <h5>
          <span data-testid="header-currency-field">BRL</span>
        </h5>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  emailStoreGet: state.user.email,
});

export default connect(mapStateToProps)(Header);

Header.propTypes = {
  emailStoreGet: PropTypes.string.isRequired,
};
