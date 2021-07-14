import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addExpenses } from '../../actions';

class BtnFormWallet extends Component {
  render() {
    const { state, novaDespesa } = this.props;
    return (
      <div>
        <button
          type="button"
          onClick={ () => novaDespesa(state) }
        >
          Adicionar despesas
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  exchangeRates: state.wallet.expenses.exchangeRates,
});

const mapDispatchToProps = (dispatch) => ({
  novaDespesa: (despesa) => dispatch(addExpenses(despesa)),
});

BtnFormWallet.propTypes = {
  state: PropTypes.shape().isRequired,
  novaDespesa: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(BtnFormWallet);
