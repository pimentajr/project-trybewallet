// requisito 05
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    const { userEmail } = this.props;
    const totalExpenses = 0;
    return (
      <div>
        <h2 data-testid="email-field">
          { userEmail }
        </h2>
        <h2 data-testid="total-field">{ totalExpenses }</h2>
        <h2 data-testid="header-currency-field">BRL</h2>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  userEmail: state.user.email,
});

Header.propTypes = ({
  userEmail: PropTypes.string,
}).isRequired;

export default connect(mapStateToProps)(Header);
