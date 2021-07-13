import React from 'react';
import { useSelector } from 'react-redux';

export default function CoinOptions() {
  const coins = useSelector((state) => state.wallet.currencies);
  const coinsTotal = Object.keys(coins);
  return (
    <>
      { coinsTotal.map((coin, index) => {
        if (coin !== 'USDT') {
          return (
            <option key={ index }>
              { coin }
            </option>
          );
        }
        return null;
      }) }
    </>
  );
}
