import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Inputs from '../form-components/Inputs';
import Selects from '../form-components/Selects';
import { setEditedExpense } from '../actions';

class EditForm extends Component {
  constructor(props) {
    super(props);
    const { expenseToEdit } = this.props;
    const {
      method, tag, description,
      currency, value, id, exchangeRates,
    } = expenseToEdit;
    this.state = {
      value,
      description,
      currency,
      method,
      tag,
      id,
      exchangeRates,
    };
    this.changeValues = this.changeValues.bind(this);
    this.editExpense = this.editExpense.bind(this);
  }

  changeValues({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  editExpense() {
    const { value, description, currency, method, tag, id, exchangeRates } = this.state;
    const { setEdited, expenseToEdit } = this.props;
    const expense = {
      id,
      value,
      description,
      currency,
      method,
      tag,
      exchangeRates,
    };
    setEdited(expenseToEdit, expense);
  }

  render() {
    const { exchangeRates, method, tag, description, currency, value } = this.state;
    const FIFTEEN = 15;
    return (
      <div>
        <form className="forms edit">
          <Inputs
            value={ value }
            description={ description }
            func={ this.changeValues }
          />
          <Selects
            method={ method }
            tag={ tag }
            currency={ currency }
            currencies={ exchangeRates }
            FIFTEEN={ FIFTEEN }
            func={ this.changeValues }
          />
          <button type="button" onClick={ this.editExpense }>
            Editar despesa
          </button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  expenseToEdit: state.wallet.editExpense,
});

const mapDispatchToProps = (dispatch) => ({
  setEdited: (state, edited) => dispatch(setEditedExpense(state, edited)),
});

EditForm.propTypes = {
  expenseToEdit: PropTypes.objectOf(String).isRequired,
  setEdited: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(EditForm);
