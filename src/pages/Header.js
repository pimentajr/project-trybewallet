import React from 'react';
import { connect } from 'react-redux';

class Header extends React.component {

}

const mapStateToProps = (state) => ({
  login: state.user.email,
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Header);
