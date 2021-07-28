import React from 'react';
import Header from '../components/Header';
import Form from '../components/Form';

class Wallet extends React.Component {
  // coinAPI() {
  //   fetch('https://economia.awesomeapi.com.br/json/all')
  //     .then((result) => result.json());
  //   console.log(result);
  // }

  render() {
    return (
      <div>
        TrybeWallets
        <Header />
        <Form />
      </div>
    );
  }
}

export default Wallet;
