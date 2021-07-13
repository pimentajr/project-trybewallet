import React from 'react';
import { connect } from 'react-redux';

class Header extends React.Component {
  render() {
    return (
      <div className="wallet-header">
        <div>
          <p data-testid="email-field">
            { }
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
  username: state.user.username,
});

export default connect(mapStateToProps)(Header);
