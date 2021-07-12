import React from 'react';
import Header from '../components/Header';
import ExpenseForm from '../components/ExpenseForm';
import ExpenseTable from '../components/ExpenseTable';

class Wallet extends React.Component {
  constructor() {
    super();

    this.state = {
      editingExpense: {},
    };

    this.setEditingExpense = this.setEditingExpense.bind(this);
  }

  setEditingExpense(editingExpense) {
    this.setState({
      editingExpense,
    });
  }

  render() {
    const { editingExpense } = this.state;

    return (
      <main>
        <Header />
        <ExpenseForm
          editingExpense={ editingExpense }
          setEditingExpense={ this.setEditingExpense }
        />
        <ExpenseTable setEditingExpense={ this.setEditingExpense } />
      </main>
    );
  }
}

export default Wallet;
