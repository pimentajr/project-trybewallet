import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends React.Component {
  constructor() {
    super();

    this.state = {
      totalValue: 0,
    };
  }

  render() {
    const { totalValue } = this.state;
    const { email } = this.props;
    // console.log(email);
    return (
      <header>
        <p data-testid="email-field">
          Email:
          { email }
        </p>
        <div>
          <p data-testid="total-field">
            Despesa Total:
            {totalValue}
          </p>
          <p data-testid="header-currency-field">BRL</p>
        </div>
      </header>
    );
  }
}

Header.propTypes = ({
  email: PropTypes.string,
}).isRequired;

// requisito 5 feito com ajuda da Gabi Feijó
const mapStateToProps = (state) => ({
  email: state.user.email,
});

export default connect(mapStateToProps)(Header);
