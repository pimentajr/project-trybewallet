import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import Header from '../components/Header';
import Form from '../components/Form';
import { fetchAPI } from '../actions/walletActions';

export const Wallet = (props) => {
  const { fetchCurrency } = props;

  useEffect(() => {
    fetchCurrency();
  }, [])

  return (
    <div className="Wallet">
      <Header />
      <Form />
    </div>
  )
}

const mapStateToProps = (state) => state;

const mapDispatchToProps = (dispatch) => ({
  fetchCurrency: () => dispatch(fetchAPI())
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet)
