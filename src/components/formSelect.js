import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class formSelect extends Component {
  render() {
    const { currencies, onChang } = this.props;
    return (
      <>
        <label htmlFor="Moeda" type="combobox">
          Moeda:
          <select name="currency" id="Moeda" onChange={ (e) => onChang(e) }>
            { currencies.map((coin, index) => (<option key={ index }>{ coin }</option>)) }
          </select>
        </label>
        <label htmlFor="metodo">
          Método de pagamento:
          <select name="method" id="metodo" onChange={ (e) => onChang(e) }>
            <option>Dinheiro</option>
            <option>Cartão de crédito</option>
            <option>Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="despesa">
          Tag:
          <select name="tag" id="despesa" onChange={ (e) => onChang(e) }>
            <option>Alimentação</option>
            <option>Lazer</option>
            <option>Trabalho</option>
            <option>Transporte</option>
            <option>Saúde</option>
          </select>
        </label>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

export default connect(mapStateToProps, null)(formSelect);

formSelect.propTypes = {
  onChang: PropTypes.func,
}.isRequired;
