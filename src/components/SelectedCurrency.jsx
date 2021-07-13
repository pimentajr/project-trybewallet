import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchApi } from '../actions/index';

class SelectedCurrency extends Component {
  componentDidMount() {
    const { coinType } = this.props;
    coinType();
  }

  render() {
    const { coinTypetest } = this.props;
    const test = Object.keys(coinTypetest).filter((value) => value !== 'USDT');
    return (
      <label htmlFor="options">
        Moeda:
        <select id="options">
          {
            // onChange= {(e) => onChangeSelect(e.target.value)} -> usar no select talvez
            test.map((type, index) => <option key={ index }>{ type }</option>)
          }
        </select>
      </label>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  coinType: () => dispatch(fetchApi()),
});

const mapStateToProps = (state) => ({
  coinTypetest: state.wallet.currencies,
});

export default connect(mapStateToProps, mapDispatchToProps)(SelectedCurrency);

SelectedCurrency.propTypes = {
  coinType: PropTypes.array,
}.isRequired;
