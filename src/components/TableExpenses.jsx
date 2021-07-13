import React, { Component } from 'react';
import { connect } from 'react-redux';

class TableExpenses extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { expense } = this.props;
    return (
      <section>
        {console.log(expense)}
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  expense: state.wallet.expenses,
});

export default connect(mapStateToProps)(TableExpenses);
