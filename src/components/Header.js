import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends React.Component {
  constructor() {
    super();
  }

  render() {
    const { email } = this.props;
    return (
      <header>
        <span data-testid="email-field">
          Email:
          { email }
        </span>
      </header>
    );
  }
}

Header.propTypes = ({
  email: PropTypes.string,
}).isRequired;

const mapStateToProps = ({
  email: state.login.email,
});

export default connect(mapStateToProps)(Header);
