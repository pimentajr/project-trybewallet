import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import ExpensesForm from '../components/ExpensesForm';
import ExpensesTable from '../components/ExpensesTable';
import { fetchAPI } from '../actions';
import './Wallet.css';

// const inlineCSS = {
//   marginTop: '20px',
//   display: 'flex',
//   flexDirection: 'column',
//   alignItems: 'center',
// };

// const inlineCSS2 = {
//   marginTop: '10px',
//   backgroundColor: 'royalblue',
//   padding: '16px 20px',
//   borderRadius: '.25rem',
//   color: 'white',
//   cursor: 'pointer',
//   textDecoration: 'none',
//   fontWeight: '600',
// };

class Wallet extends React.Component {
  componentDidMount() {
    const { fetchCurrencies } = this.props;
    fetchCurrencies();
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
        <ExpensesTable />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchCurrencies: () => dispatch(fetchAPI()),
});

Wallet.propTypes = {
  fetchCurrencies: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Wallet);
