import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Header from '../components/Header';
import Form from '../components/Form';
import { fetchAPI } from '../actions/walletActions';

const Wallet = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAPI());
  }, []);

  return (
    <div className="Wallet">
      <Header />
      <Form />
    </div>
  );
};

export default Wallet;
