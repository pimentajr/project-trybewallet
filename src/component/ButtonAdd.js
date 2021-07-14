import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRates } from '../actions';
import { GlobalContext } from '../GlobalContext';

const ButtonAdd = () => {
  const wallet = useSelector((state) => state.wallet);
  const { walletExpenses, providerValues } = React.useContext(GlobalContext);
  const dispatch = useDispatch();

  function handleClick(event) {
    const { id, setId, total } = providerValues;
    setId(id + 1);
    const rate = wallet.currencies[walletExpenses.currency].ask;
    providerValues.setRate(rate);
    providerValues.setTotal(total + Number(rate * walletExpenses.value));
    dispatch(fetchRates(walletExpenses));
    event.preventDefault();
  }

  return (
    <div>
      <button type="submit" onClick={ handleClick }>Adicionar despesa</button>
    </div>
  );
};

export default ButtonAdd;
