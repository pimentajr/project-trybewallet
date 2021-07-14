import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ButtonAdd from './ButtonAdd';
import CompMethod from './CompMethod';
import CompOptionMoed from './CompOptionMoed';
import { sendId } from '../actions';
import CompMethodDesp from './CompMethodDesp';
import CompInputText from './CompInputText';

class FormWallet extends Component {
  constructor() {
    super();
    this.state = {
      id: -1,
      value: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      description: '',
    };
    this.ocValue = this.ocValue.bind(this);
    this.setValueState = this.setValueState.bind(this);
    this.resetState = this.resetState.bind(this);
  }

  componentDidUpdate() {
    this.setValueState();
  }

  setValueState() {
    const { editId, funcEditId, editItem } = this.props;
    const not = -1;
    if (editId >= 0) {
      const { value, currency, method, tag, description,
        exchangeRates } = editItem[editId];
      this.setState({
        id: editId,
        value,
        currency,
        method,
        tag,
        description,
        exchangeRates,
      });
      funcEditId(not);
    }
  }

  resetState() {
    this.setState({
      id: -1,
      value: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      description: '',
      exchangeRates: {},
    });
  }

  ocValue({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  render() {
    const { id, value, description, currency, method, tag, exchangeRates } = this.state;
    return (
      <form>
        <CompInputText value={ value } desc={ description } func={ this.ocValue } />
        <label htmlFor="moed">
          Moeda
          <select
            name="currency"
            data-testid="currency-input"
            id="moed"
            value={ currency }
            onChange={ this.ocValue }
          >
            <CompOptionMoed />
          </select>
        </label>
        <label htmlFor="method">
          Método de pagamento
          <select
            name="method"
            id="method"
            data-testid="method-input"
            value={ method }
            onChange={ this.ocValue }
          >
            <CompMethod />
          </select>
        </label>
        <label htmlFor="methoddesp">
          Tag
          <select
            name="tag"
            id="methoddesp"
            value={ tag }
            data-testid="tag-input"
            onChange={ this.ocValue }
          >
            <CompMethodDesp />
          </select>
        </label>
        <ButtonAdd
          propsForm={ this.state }
          idd={ id }
          func={ this.resetState }
          exchangeRates={ exchangeRates }
        />
      </form>
    );
  }
}

const mapStatetoProps = (state) => ({
  editId: state.user.id,
  editItem: state.wallet.expenses,
});

const matDispachToProps = (dispach) => ({
  funcEditId: (value) => dispach(sendId(value)),
});

export default connect(mapStatetoProps, matDispachToProps)(FormWallet);

FormWallet.propTypes = {
  editId: PropTypes.number.isRequired,
  editItem: PropTypes.arrayOf(PropTypes.object).isRequired,
  funcEditId: PropTypes.func.isRequired,
};
