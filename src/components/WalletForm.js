import React, { Component } from 'react';
import ValueInput from './ValueInput';
import CoinSelect from './CoinSelect';
import PaymentSelect from './PaymentSelect';
import TagSelect from './TagSelect';
import DescriptionInput from './DescriptionInput';

class WalletForm extends Component {
  render() {
    return (
      <form>
        <ValueInput />
        <DescriptionInput />
        <CoinSelect />
        <PaymentSelect />
        <TagSelect />
      </form>
    );
  }
}

export default WalletForm;
