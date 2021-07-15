import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getState } from '../actions/getState';

class Category extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tag: '',
    };
    this.handleTest = this.handleTest.bind(this);
  }

  handleTest(e) {
    const { getStateAction } = this.props;
    const NUMBER = 0;
    this.setState({
      tag: e.target.value,
    });
    const { tag } = this.state;
    getStateAction(tag, NUMBER);
  }

  render() {
    const { tag } = this.state;
    return (
      <div>
        <label htmlFor="Category">
          Tag:
          <select
            id="Category"
            value={ tag }
            onChange={ this.handleTest }
          >
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
        </label>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getStateAction: (payload, test) => dispatch(getState(payload, test)),
});

const mapStateToProps = (state) => ({
  buttonClicked: state.wallet.button,
});

export default connect(mapStateToProps, mapDispatchToProps)(Category);

Category.propTypes = {
  getStateAction: PropTypes.array,
}.isRequired;
