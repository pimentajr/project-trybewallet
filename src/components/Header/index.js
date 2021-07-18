import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
  constructor() {
    super();
    this.state = ({
      total: 0,
    });
  }

  render() {
    const { total } = this.state;
    const { userEmail } = this.props;
    return (
      <header>
        <header>
          <span
            data-testid="email-field"
          >
            { `Email: ${userEmail}` }
          </span>
          <p>
            Despesa Total: R$
            <span
              data-testid="total-field"
            >
              { total }
            </span>
          </p>
          <span
            data-testid="header-currency-field"
          >
            BRL
          </span>
        </header>
      </header>
    );
  }
}

Header.propTypes = {
  userEmail: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  userEmail: state.user,
});

export default connect(mapStateToProps, null)(Header);
