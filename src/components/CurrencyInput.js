import React from 'react';
import { useSelector } from 'react-redux';

export default function CurrencyInput() {
  const currencies = useSelector((state) => state.wallet.currencies);

  const getOptions = () => {
    if (currencies.length > 0) {
      return currencies.map((el, index) => (
        <option key={ index } value={ el }>
          {el}
        </option>
      ));
    }
  };

  return (
    <div className="form-group">
      <label htmlFor="currency">
        Moeda
        <select
          data-testid="currency-input"
          defaultValue="USD"
          id="currency"
          name="currency"
          className="form-select"
        >
          {getOptions()}
        </select>
      </label>
    </div>
  );
}
