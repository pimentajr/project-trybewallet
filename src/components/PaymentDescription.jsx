import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getState } from '../actions/getState';

class PaymentDescription extends Component {
  constructor(props) {
    super(props);
    this.state = {
      description: '',
    };
    this.handleTest = this.handleTest.bind(this);
  }

  handleTest(e) {
    const { getStateAction } = this.props;
    const NUMBER = 3;
    this.setState({
      description: e.target.value,
    });
    const { description } = this.state;
    getStateAction(description, NUMBER);
  }

  render() {
    const { description } = this.state;
    return (
      <div>
        <label htmlFor="description">
          Descrição:
          <input
            type="text"
            name="description"
            id="description"
            value={ description }
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

export default connect(null, mapDispatchToProps)(PaymentDescription);

PaymentDescription.propTypes = {
  getStateAction: PropTypes.array,
}.isRequired;
