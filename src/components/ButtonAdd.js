import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setArrayExpenses, fetchCurrencie, editArrayExpenses } from '../actions';

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
    const { value, tag, currency, method, description } = propsForm;
    const newvalue = {
      id: idIndex,
      value,
      tag,
      currency,
      method,
      description,
      exchangeRates: payload,
    };
    newCurrencie(newvalue);
  }

  editExpenses() {
    const { editCurrencie, propsForm, func } = this.props;
    const newvalue = {
      ...propsForm,
    };
    editCurrencie(newvalue);
    func();
  }

  render() {
    const { idd } = this.props;
    const not = -1;
    return (
      idd === not
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
  getCurrency: () => dispach(fetchCurrencie()),
});

export default connect(mapStatetoProps, mapDispatchProps)(ButtonAdd);

ButtonAdd.propTypes = {
  newCurrencie: PropTypes.func.isRequired,
  getCurrency: PropTypes.func.isRequired,
  func: PropTypes.func.isRequired,
  idd: PropTypes.number.isRequired,
  expensesItems: PropTypes.arrayOf(PropTypes.object).isRequired,
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
