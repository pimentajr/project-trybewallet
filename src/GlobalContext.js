import React from 'react';
import PropTypes from 'prop-types';

export const GlobalContext = React.createContext();

export const GlobalStorage = ({ children }) => {
  const [value, setValue] = React.useState(0);
  const [description, setDescription] = React.useState('');
  const [currency, setCurrency] = React.useState('USD');
  const [method, setMethod] = React.useState('Dinheiro');
  const [tag, setTag] = React.useState('Alimentação');
  const [id, setId] = React.useState(0);
  const [exchangeRates] = React.useState('');
  const [rate, setRate] = React.useState('');
  const [total, setTotal] = React.useState(0);

  const walletExpenses = {
    value,
    description,
    currency,
    method,
    tag,
    id,
    exchangeRates,
  };

  const providerValues = {
    setValue,
    setDescription,
    setCurrency,
    setMethod,
    setTag,
    id,
    setId,
    total,
    setTotal,
    rate,
    setRate,
  };

  return (
    <GlobalContext.Provider value={ { walletExpenses, providerValues } }>
      {children}
    </GlobalContext.Provider>
  );
};

GlobalStorage.propTypes = {
  children: PropTypes.node.isRequired,
};
