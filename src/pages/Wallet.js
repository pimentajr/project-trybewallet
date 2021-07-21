import React from 'react';
import ExpensesTable from '../components/ExpensesTable';
import Form from '../components/Form';
import Header from '../components/Header';

class Wallet extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <Form />
        <ExpensesTable />
        <footer>
          <p>
            Feito e estilizado por
            <a href="https://www.linkedin.com/in/natali-lima/"> Natali Lima</a>
          </p>
        </footer>
      </div>);
  }
}

export default Wallet;
