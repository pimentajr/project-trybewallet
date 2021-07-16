function sendWallet(stateLocal) {
  return {
    type: 'ADCIONADESPESAS',
    stateLocal, // veio por dispatch do Form.js
  };
}

export default sendWallet;
