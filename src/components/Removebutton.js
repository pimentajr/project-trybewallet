import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { removeExpense } from '../actions/removeExpense';

class Removebutton extends Component {
  render() {
    const { index, deleteExpense } = this.props;
    return (
      <button
        type="button"
        data-testid="delete-btn"
        onClick={ () => deleteExpense(index) }
      >
        Excluir
      </button>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  deleteExpense: (index) => dispatch(removeExpense(index)),
});

Removebutton.propTypes = {
  index: PropTypes.number.isRequired,
  deleteExpense: PropTypes.func,
};

Removebutton.defaultProps = {
  deleteExpense: () => console.log('function'),
};

export default connect(null, mapDispatchToProps)(Removebutton);
