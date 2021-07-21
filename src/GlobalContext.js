import React, { useState } from 'react'

export const GlobalContext = React.createContext();

export const GlobalStorage = ({ children }) => {
  const [value, setValue] = useState(0);
  const [description, setDescription] = useState('');
  const [currency, setCurrency] = useState('USD');
  const [method, setMethod] = useState('Dinheiro');
  const [tag, setTag] = useState('Alimentação');
  const [id, setId] = useState(0);
  const [exchangeRate, setExchangeRate] = useState('');
  const [rate, setRate] = useState('');
  const [total, setTotal] = useState(0);

  const paymentStore = {
    value,
    description,
    currency,
    method,
    tag,
    id,
    exchangeRate,
    rate,
    total
  };

  const setPaymentStore = {
    setValue,
    setDescription,
    setCurrency,
    setMethod,
    setTag,
    setId,
    setExchangeRate
  };

  return (
    <GlobalContext.Provider value={ {paymentStore, setPaymentStore} }>
      { children }
    </GlobalContext.Provider>
  );
};
