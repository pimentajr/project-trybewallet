import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const { emailStoreGet } = this.props;
    return (
      <header>
        <h5>Name</h5>
        <p data-testid="email-field">{ emailStoreGet }</p>
        <p>Some additional information here</p>
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
