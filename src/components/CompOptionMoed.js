import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchCurrencie } from '../actions';

class CompOptionMoed extends Component {
  constructor() {
    super();
    this.getFetchApi = this.getFetchApi.bind(this);
  }

  componentDidMount() {
    this.getFetchApi();
  }

  getFetchApi() {
    const { requestFetch } = this.props;
    requestFetch();
  }

  render() {
    const { currencies } = this.props;
    const moedValid = currencies.filter((moeda) => moeda !== 'USDT');
    return (
      moedValid.map((moeda, index) => (
        <option key={ index } value={ moeda }>{ moeda }</option>
      ))
    );
  }
}
const arrayCurrencies = (state) => ({
  currencies: state.wallet.currencies,
});

const mapDispachProps = (dispatch) => ({
  requestFetch: () => dispatch(fetchCurrencie()),
});

CompOptionMoed.propTypes = {
  requestFetch: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default connect(arrayCurrencies, mapDispachProps)(CompOptionMoed);
