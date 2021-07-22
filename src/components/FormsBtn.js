import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import fetchApi from '../services/CurrencyApi';
import { sendInfoToExpensesAction } from '../actions';

class FormsBtn extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.getApiResponse = this.getApiResponse.bind(this);
  }

  async getApiResponse() {
    const { toma, sendInfos, getExpenses, initialState } = this.props;
    const forms = document.querySelector('#forms');
    const data = await fetchApi();
    sendInfos({
      tag: 'Alimentação',
      method: 'Dinheiro',
      currency: 'USD',
      ...toma,
      id: getExpenses.length,
      exchangeRates: data,
    });
    forms.reset();
    initialState();
  }

  render() {
    const { editForm, concludeClick = {} } = this.props;
    if (editForm === true) {
      return (

        <button
          className="send-btn"
          type="button"
          onClick={ concludeClick }
        >
          Editar despesa
        </button>
      );
    }

    return (

      <button
        className="send-btn"
        type="button"
        onClick={ this.getApiResponse }
      >
        Adicionar despesa
      </button>

    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  sendInfos: (info) => dispatch(sendInfoToExpensesAction(info)),
});

const mapStateToPros = (state) => ({
  getExpenses: state.wallet.expenses,
  editForm: state.wallet.editForm,
});

export default connect(mapStateToPros, mapDispatchToProps)(FormsBtn);

FormsBtn.propTypes = {
  toma: PropTypes.objectOf(PropTypes.string),
  sendInfos: PropTypes.func.isRequired,
  getExpenses: PropTypes.arrayOf(PropTypes.object),
  initialState: PropTypes.func.isRequired,
  editForm: PropTypes.bool.isRequired,
  concludeClick: PropTypes.shape(PropTypes.object).isRequired,
};

FormsBtn.defaultProps = {
  toma: {},
  getExpenses: {},

};
