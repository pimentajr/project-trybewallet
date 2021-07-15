import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getState } from '../actions/getState';

class ExpenseAmount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      amount: 0,
    };
    this.handleTest = this.handleTest.bind(this);
  }

  handleTest(e) {
    const { getStateAction } = this.props;
    const NUMBER = 2;
    this.setState({
      amount: e.target.value,
    });
    const { amount } = this.state;
    getStateAction(amount, NUMBER);
  }

  render() {
    const { amount } = this.state;
    return (
      <div>
        <label htmlFor="value">
          Valor:
          <input
            type="number"
            name="value"
            id="value"
            value={ amount }
            onChange={ this.handleTest }
          />
        </label>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getStateAction: (payload, test) => dispatch(getState(payload, test)),
});

export default connect(null, mapDispatchToProps)(ExpenseAmount);

ExpenseAmount.propTypes = {
  getStateAction: PropTypes.array,
}.isRequired;
