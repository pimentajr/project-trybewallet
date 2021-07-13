import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends React.Component {
  render() {
    const { username } = this.props;
    return (
      <div className="wallet-header">
        <div>
          <p data-testid="email-field">
            { username }
          </p>
        </div>
        <div>
          <p data-testid="total-field">
            {0}
          </p>
        </div>
        <div>
          <p data-testid="header-currency-field">
            BRL
          </p>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  username: state.user.email,
});

export default connect(mapStateToProps)(Header);

Header.propTypes = {
  username: PropTypes.string.isRequired,
};
