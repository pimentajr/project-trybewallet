import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import HeaderWallet from '../components/HeaderWallet';
import Fomrs from '../components/Fomrs';
import { getCurrencyThunk } from '../actions';
import Table from '../components/Table';

class Wallet extends React.Component {
  componentDidMount() {
    const { activeApi } = this.props;
    activeApi();
  }

  render() {
    return (
      <>
        <HeaderWallet />
        <div className="wallet-container">
          <h1>Trybe-Wallet</h1>
          <div className="forms-container">
            <Fomrs />
            <Table />
          </div>
        </div>
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  activeApi: () => dispatch(getCurrencyThunk()),
});

const mapStateToProps = (state) => ({
  infos: state.wallet.expenses,
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);

Wallet.propTypes = {
  activeApi: PropTypes.func.isRequired,
};
