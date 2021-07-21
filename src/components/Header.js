import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const { emailStoreGet } = this.props;
    return (
      <header>
        <h4>Name</h4>
        <p data-testid="email-field">{ emailStoreGet }</p>
        <h5>
          <p data-testid="total-field">0</p>
        </h5>
        <h5>
          <p data-testid="header-currency-field">BRL</p>
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
