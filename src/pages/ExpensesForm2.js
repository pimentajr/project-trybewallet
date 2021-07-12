// import React, { Component } from 'react';

// export class ExpenseForm2 extends Component {
//   render() {
//     return (
//       <div>
//         <label htmlFor="currency">
//           Moeda
//           <select value={ currencySelected }>
//             { currency
//               .filter((crncy) => crncy !== 'USDT')
//               .map((crncy, index) => <option key={ index }>{ crncy }</option>) }
//           </select>
//         </label>
//         <label htmlFor="payment-method">
//           Método de pagamento
//           <select id="payment-method" value={ paymentMethod }>
//             <option>Dinheiro</option>
//             <option>Cartão de crédito</option>
//             <option>Cartão de débito</option>
//           </select>
//         </label>
//         <label htmlFor="tag">
//           Tag
//           <select id="tag" value={ tag } onChange={ this.handleChanges }>
//             <option>Alimentação</option>
//             <option>Lazer</option>
//             <option>Trabalho</option>
//             <option>Transporte</option>
//             <option>Saúde</option>
//           </select>
//         </label>
//         <button type="submit" onClick={ this.submitData }>
//           Adicionar Despesa
//         </button>
//       </div>
//     );
//   }
// }

// export default ExpenseForm2;
