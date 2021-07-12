import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ExpensesForm from '../components/ExpensesForm';
import Header from '../components/Header';
import store from '../store';
import fetchAPI from '../services/api';
import './Wallet.css';

const inlineCSS = {
  marginTop: '20px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
};

const inlineCSS2 = {
  marginTop: '10px',
  backgroundColor: 'royalblue',
  padding: '16px 20px',
  borderRadius: '.25rem',
  color: 'white',
  cursor: 'pointer',
  textDecoration: 'none',
  fontWeight: '600',
};

class Wallet extends React.Component {
  constructor() {
    super();
    this.state = {
      currencies: [],
    };

    this.fetchCurrencies = this.fetchCurrencies.bind(this);
  }

  componentDidMount() {
    this.fetchCurrencies();
  }

  fetchCurrencies() {
    const { storeCurrencies } = this.props;
    fetchAPI().then((currencies) => {
      storeCurrencies(currencies);
      // this.setState(() => ({ currencies }));
    });
  }

  render() {
    // const { email } = store.getState().user;

    // if (!email) {
    //   return (
    //     <div style={ inlineCSS }>
    //       <h1>Você não está logado!</h1>
    //       <Link style={ inlineCSS2 } to="/">Página inicial</Link>
    //     </div>
    //   );
    // }

    return (
      <div className="wallet">
        <Header />
        <ExpensesForm />
      </div>
    );
  }
}

// ajustar import
const mapDispatchToProps = (dispatch) => ({
  storeCurrencies: (currencies) => dispatch({ type: 'STORE_CURRENCIES', currencies }),
});

Wallet.propTypes = {
  storeCurrencies: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Wallet);
