import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getState } from '../actions/getState';

class AddExpenses extends Component {
  constructor(props) {
    super(props);
    this.state = {
      AddExpensesButton: false,
    };
    this.handleTest = this.handleTest.bind(this);
  }

  handleTest() {
    const { getStateAction } = this.props;
    this.setState({
      AddExpensesButton: true,
    });
    const { AddExpensesButton } = this.state;
    getStateAction(null, null, AddExpensesButton);
  }

  render() {
    return (
      <div>
        <button
          type="button"
          name="value"
          id="button"
          onClick={ this.handleTest }
        >
          Adicionar despesa
        </button>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getStateAction: (payload, test) => dispatch(getState(payload, test)),
});

export default connect(null, mapDispatchToProps)(AddExpenses);

AddExpenses.propTypes = {
  getStateAction: PropTypes.array,
}.isRequired;
