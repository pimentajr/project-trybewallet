import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FormWallet from '../components/FormWallet';
import NavWallet from '../components/NavWallet';
import { getCurrencies } from '../actions';

function Wallet() {
  const currencies = useSelector((state) => state.wallet.currencies);
  const dispatch = useDispatch();
  const [inputFormW, setInputFormW] = useState({
    valor: 0,
    desc: '',
    currency: '',
    payment: '',
    tag: '',
  });

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
      />
    </div>
  );
}

export default Wallet;
