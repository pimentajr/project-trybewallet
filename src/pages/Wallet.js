import React from 'react';

import HeaderWallet from '../components/HeaderWallet';
import ExpenseFormWallet from '../components/ExpenseFormWallet';
import ExpenseTable from '../components/ExpenseTable';

class Wallet extends React.Component {
  constructor(props) {
    super(props);

    this.getData = this.getData.bind(this);

    this.state = {
      currencies: [],
    };
  }

  componentDidMount() {
    this.getData();
  }

  async getData() {
    const URL = 'https://economia.awesomeapi.com.br/json/all';
    const fetchAPI = await fetch(URL);
    const parseJSON = await fetchAPI.json();

    const getCurrencies = Object.keys(parseJSON);
    const removedUSDT = getCurrencies.filter((target) => target !== 'USDT');

    this.setState({
      currencies: [...removedUSDT],
    });
  }

  render() {
    const { currencies } = this.state;

    return (
      <div className="wallet-page">
        <HeaderWallet />
        <ExpenseFormWallet currencies={ currencies } />
        <ExpenseTable />
      </div>);
  }
}

export default Wallet;
