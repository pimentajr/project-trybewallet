import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getState } from '../actions/getState';

class PaymentMethod extends Component {
  constructor(props) {
    super(props);
    this.state = {
      method: '',
    };
    this.handleTest = this.handleTest.bind(this);
  }

  handleTest(e) {
    const { getStateAction } = this.props;
    const NUMBER = 4;
    this.setState({
      method: e.target.value,
    });
    const { method } = this.state;
    getStateAction(method, NUMBER);
  }

  render() {
    const { method } = this.state;
    return (
      <div>
        <label htmlFor="PaymentMethod">
          Método de pagamento:
          <select
            id="PaymentMethod"
            value={ method }
            onChange={ this.handleTest }
          >
            <option value="Dinheiro">Dinheiro</option>
            <option value="crédito">Cartão de crédito</option>
            <option value="débito">Cartão de débito</option>
          </select>
        </label>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getStateAction: (payload, test) => dispatch(getState(payload, test)),
});

export default connect(null, mapDispatchToProps)(PaymentMethod);

PaymentMethod.propTypes = {
  getStateAction: PropTypes.array,
}.isRequired;
