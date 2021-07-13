import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FormWallet from '../components/FormWallet';
import NavWallet from '../components/NavWallet';
import { getCurrencies, submitExpenses } from '../actions';

function Wallet() {
  const { currencies, expenses } = useSelector((state) => state.wallet);
  const dispatch = useDispatch();
  const [inputFormW, setInputFormW] = useState({
    valor: 0,
    desc: '',
    currency: 'USD',
    payment: 'dinheiro',
    tag: 'alimentacao',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('click');
    dispatch(submitExpenses({ ...inputFormW, id: expenses.length }));
  };

  const handleChange = ({ target }) => {
    const { value, name } = target;
    setInputFormW({
      ...inputFormW,
      [name]: value,
    });
  };

  useEffect(() => {
    dispatch(getCurrencies());
  }, [dispatch]);
  return (
    <div>
      <NavWallet />
      <FormWallet
        handleChange={ handleChange }
        inputFormW={ inputFormW }
        currencies={ currencies }
        handleSubmit={ handleSubmit }
      />
    </div>
  );
}

export default Wallet;
