import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setArrayExpenses, fetchCurrencie, editArrayExpenses, sendId } from '../actions';

class ButtonAdd extends Component {
  constructor() {
    super();
    this.sendExpenses = this.sendExpenses.bind(this);
    this.editExpenses = this.editExpenses.bind(this);
  }

  async sendExpenses() {
    const { newCurrencie, propsForm, getCurrency, expensesItems } = this.props;
    const { payload } = await getCurrency();
    let idIndex = 0;
    for (let index = 0; index <= expensesItems.length; index += 1) {
      if (expensesItems[index] !== undefined) {
        idIndex = expensesItems.length;
      }
    }
    const { id = idIndex, value, tag, currency, method, description } = propsForm;
    const newvalue = {
      id,
      value,
      tag,
      currency,
      method,
      description,
      exchangeRates: payload,
    };
    newCurrencie(newvalue);
  }

  async editExpenses() {
    const { editCurrencie, propsForm, getCurrency, func } = this.props;
    const { payload } = await getCurrency();
    const { id, value, tag, currency, method, description } = propsForm;
    const newvalue = {
      id,
      value,
      tag,
      currency,
      method,
      description,
      exchangeRates: payload,
    };
    func();
    editCurrencie(newvalue);
  }

  render() {
    const { idd } = this.props;
    return (
      idd === undefined
        ? <button type="button" onClick={ this.sendExpenses }>Adicionar despesa</button>
        : <button type="button" onClick={ this.editExpenses }>Editar despesa</button>
    );
  }
}

const mapStatetoProps = (state) => ({
  expensesItems: state.wallet.expenses,
  idEdit: state.user.id,
});

const mapDispatchProps = (dispach) => ({
  newCurrencie: (value) => dispach(setArrayExpenses(value)),
  editCurrencie: (value) => dispach(editArrayExpenses(value)),
  editClose: (value) => dispach(sendId(value)),
  getCurrency: () => dispach(fetchCurrencie()),
});

export default connect(mapStatetoProps, mapDispatchProps)(ButtonAdd);

ButtonAdd.propTypes = {
  newCurrencie: PropTypes.func.isRequired,
  getCurrency: PropTypes.func.isRequired,
  func: PropTypes.func.isRequired,
  idd: PropTypes.number.isRequired,
  expensesItems: PropTypes.objectOf().isRequired,
  editCurrencie: PropTypes.func.isRequired,
  propsForm: PropTypes.shape({
    id: PropTypes.number,
    value: PropTypes.string,
    dc: PropTypes.string,
    currency: PropTypes.string,
    method: PropTypes.string,
    tag: PropTypes.string,
    description: PropTypes.string,
  }).isRequired,
};
