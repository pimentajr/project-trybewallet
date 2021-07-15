import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Inputs extends Component {
  render() {
    const { handleChange, currencies } = this.props;
    const moedas = currencies[0];
    console.log(moedas);
    return (
      <>
        <label htmlFor="value">
          Valor
          <input type="number" id="value" onChange={ handleChange } />
        </label>
        <label htmlFor="description">
          Descrição
          <input type="text" id="description" onChange={ handleChange } />
        </label>
        <label htmlFor="currency">
          Moeda
          <select id="currency" onChange={ handleChange }>
            {(currencies.map((coins) => Object.values(coins).map((siglas) => siglas)
              .filter((item) => item.codein !== 'BRLT')
              .map((element) => <option key={ element.code }>{element.code}</option>)))}
          </select>
        </label>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

Inputs.propTypes = {
  handleChange: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(Object).isRequired,
};

export default connect(mapStateToProps)(Inputs);
