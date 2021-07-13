import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchApi } from '../actions/index';

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
    this.setState({
      currency: e.target.value,
    });
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
          onClick={ this.handleTest }
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
});

const mapStateToProps = (state) => ({
  coinTypetest: state.wallet.currencies,
});

export default connect(mapStateToProps, mapDispatchToProps)(SelectedCurrency);

SelectedCurrency.propTypes = {
  coinType: PropTypes.array,
}.isRequired;
