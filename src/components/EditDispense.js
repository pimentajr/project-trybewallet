import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Method from './Method';
import FormsBtn from './FormsBtn';
import {
  AllowEditFormAction,
  ResetEditableObjectAction,
  SendEditatedObjectAction,
} from '../actions';

class EditDispense extends Component {
  constructor(props) {
    super(props);
    const { objectToEdit } = this.props;
    this.up = this.up.bind(this);
    this.state = {
      value: objectToEdit.value,
      tag: objectToEdit.tag,
      method: objectToEdit.method,
      currency: objectToEdit.currency,
      description: objectToEdit.description,
    };
    this.concludeClick = this.concludeClick.bind(this);
    this.up = this.up.bind(this);
    this.descInput = this.descInput.bind(this);
  }

  up(e) {
    this.setState({
      [e.target.id]: e.target.value,
    });
  }

  concludeClick() {
    const {
      editFormsfalse, SendEditatedObj, objectToEdit,
    } = this.props;

    const obj = {
      ...this.state,
      id: objectToEdit.id,
      exchangeRates: objectToEdit.exchangeRates,
    };

    SendEditatedObj(objectToEdit.id, obj);
    editFormsfalse(false);
  }

  descInput() {
    const { description: des } = this.state;
    return (
      <label htmlFor="description">
        Descrição:
        <textarea
          data-testid="description-input"
          onChange={ this.up }
          id="description"
          type="text"
          value={ des }
        />
      </label>
    );
  }

  render() {
    const { value, tag, method, currency: coin } = this.state;
    const { currency } = this.props;
    return (
      <form className="forms" id="forms-edit">
        <label htmlFor="value">
          Valor:
          <input
            data-testid="value-input"
            value={ value }
            onChange={ this.up }
            id="value"
            className="Valor"
            type="text"
          />
        </label>
        {this.descInput()}
        <label htmlFor="currency">
          Moeda:
          <select
            data-testid="currency-input"
            onChange={ this.up }
            id="currency"
            value={ coin }
          >
            {
              currency
                .map((item, index) => (
                  <option key={ index } value={ item }>{item}</option>))
            }
          </select>
        </label>
        <Method up={ this.up } value={ method } />
        <label htmlFor="tag">
          Tag:
          <select data-testid="tag-input" onChange={ this.up } id="tag" value={ tag }>
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
        </label>
        <FormsBtn concludeClick={ this.concludeClick } />
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  currency: state.wallet.currencies,
  objectToEdit: state.wallet.editableObject,
});

const mapDispatchToProps = (dispatch) => ({
  editFormsfalse: (boolean) => dispatch(AllowEditFormAction(boolean)),
  resetEditableObject: () => dispatch(ResetEditableObjectAction()),
  SendEditatedObj: (index, payload) => dispatch(SendEditatedObjectAction(index, payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditDispense);

EditDispense.propTypes = {
  objectToEdit: PropTypes.shape(PropTypes.object),
  currency: PropTypes.string.isRequired,
  editFormsfalse: PropTypes.bool.isRequired,
  SendEditatedObj: PropTypes.func.isRequired,
};

EditDispense.defaultProps = {
  objectToEdit: {},
};
