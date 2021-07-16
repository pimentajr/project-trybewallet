import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      total: 0,
      currency: 'BRL',
    };
  }

  render() {
    const { total, currency } = this.state;
    const { email } = this.props;
    // console.log(this.props);
    return (
      <div>
        <p data-testid="email-field">
          { email }
        </p>
        <p data-testid="total-field">
          { total }
        </p>
        <p data-testid="header-currency-field">
          { currency }
        </p>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Header);
