import React, { Component } from 'react';
import { connect } from 'react-redux';
import Value from './editComponents/Value';
import Description from './editComponents/Description';
import Currency from './editComponents/Currency';
import PaymentMethod from './editComponents/PaymentMethod';
import Category from './editComponents/Category';
import { editDone } from '../actions/index';

class ExpenseEditorArea extends Component {
  constructor(props) {
    super(props);
    const { editID } = this.props;
    const { value, description, currency, method, tag, id } = editID[0];
    this.state = {
      value,
      description,
      currency,
      method,
      tag,
      id,
    };

    this.handlerChange = this.handlerChange.bind(this);
    this.applyEdit = this.applyEdit.bind(this);
  }

  applyEdit() {
    const { finishEdit, editID } = this.props;
    const { exchangeRates } = editID[0];
    // console.log(editID);
    // problema na linha 45 do wallet.js
    console.log({ ...this.state, exchangeRates });
    finishEdit({ ...this.state, exchangeRates });
  }

  handlerChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  render() {
    const { currencies } = this.props;
    const { value, description, currency, method, tag, id } = this.state;
    return (
      <>
        <Value value={ value } handlerChange={ this.handlerChange } />
        <Description description={ description } handlerChange={ this.handlerChange } />
        <Currency
          currency={ currency }
          handlerChange={ this.handlerChange }
          currencies={ currencies }
        />
        <PaymentMethod method={ method } handlerChange={ this.handlerChange } />
        <Category category={ tag } handlerChange={ this.handlerChange } />
        <button
          type="button"
          data-testid="edit-btn"
          onClick={ () => this.applyEdit() }
        >
          Editar despesa
        </button>
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  finishEdit: (obj) => dispatch(editDone(obj)),
});

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  editID: state.wallet.editID,
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseEditorArea);
