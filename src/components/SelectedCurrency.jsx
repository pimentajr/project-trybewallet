import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchApi } from '../actions/index';
import { getState } from '../actions/getState';

class SelectedCurrency extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currency: '',
    };
    this.handleTest = this.handleTest.bind(this);
  }

  componentDidMount() {
    const { coinType } = this.props;
    coinType();
  }

  handleTest(e) {
    const { getStateAction } = this.props;
    const NUMBER = 1;
    this.setState({
      currency: e.target.value,
    });
    const { currency } = this.state;
    getStateAction(currency, NUMBER);
  }

  render() {
    const { coinTypetest } = this.props;
    const { currency } = this.state;
    const test = Object.keys(coinTypetest).filter((value) => value !== 'USDT');
    return (
      <label htmlFor="options">
        Moeda:
        <select
          id="options"
          value={ currency }
          onChange={ this.handleTest }
        >
          {
            test.map((type, index) => <option key={ index }>{ type }</option>)
          }
        </select>
      </label>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  coinType: () => dispatch(fetchApi()),
  getStateAction: (payload, test) => dispatch(getState(payload, test)),
});

const mapStateToProps = (state) => ({
  coinTypetest: state.wallet.currencies,
});

export default connect(mapStateToProps, mapDispatchToProps)(SelectedCurrency);

SelectedCurrency.propTypes = {
  coinType: PropTypes.array,
}.isRequired;
