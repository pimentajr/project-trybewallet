/* import React from 'react';
import PropTypes from 'prop-types';
import CurrencyOptionsWallet from './CurrencyOptionsWallet';

const walletStore = useSelector((state) => state.wallet.expenses);

export default function ExpenseFormWallet(props) {
  const { handleChange, handleAddExpense } = props;
  return (
    <form>
      <label htmlFor="1">
        Valor:
        <input id="1" type="number" name="value" onChange={ handleChange } />
      </label>
      <label htmlFor="2">
        Descrição
        <input id="2" type="text" name="description" onChange={ handleChange } />
      </label>
      <label htmlFor="3">
        Moeda
        <select id="3" name="currency" onChange={ handleChange }>
          <CurrencyOptionsWallet currencies={ walletStore.currencies } />
        </select>
      </label>
      <label htmlFor="4">
        Método de pagamento
        <select name="method" id="4" onChange={ handleChange }>
          <option value>method</option>
        </select>
      </label>
      <label htmlFor="5">
        Tag
        <select name="tag" id="5" onChange={ handleChange }>
          <option value>method</option>
        </select>
      </label>
      <button type="button" onChange={ handleAddExpense }>Adicionar despesa</button>
    </form>
  );
}

ExpenseFormWallet.propTypes = {
  handleChange: PropTypes.func.isRequired,
  handleAddExpense: PropTypes.func.isRequired,
};
 */
