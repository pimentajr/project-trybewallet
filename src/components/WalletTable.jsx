import React from 'react';
import { connect } from 'react-redux';
import { fetchCoinsAPI, addExpense } from '../actions';

class WalletTable extends React.Component {
  constructor() {
    super();

    this.state = {
      value: 0,
      description:'',
      currency:'USD',
      method:'dinheiro',
      tag:'alimentacao',
    }

    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    const { fetchAPI } = this.props;
    fetchAPI();
  }

  handleChange({ target }) {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    this.setState({
      [name]: value,
    });
  }
  render() {
    const { coinsData, setExpense } = this.props;
    let siglas = [];
 
    if (coinsData !== undefined) {
      delete coinsData['USDT'];
      siglas = Object.keys(coinsData);
    }

    return (
      <form>
        <label>
          Valor: <input type="text" name="value" onChange={this.handleChange} />
        </label>
        <label>
          Moeda:{' '}
          <select name="currency" onChange={this.handleChange}>
            {siglas.map((sigla, index) => (
              <option key={index} value={sigla}>
                {sigla}
              </option>
            ))}
          </select>
        </label>
        <label>
          Método de Pagamento:{' '}
          <select name="method" onChange={this.handleChange}>
            <option>Dinheiro</option>
            <option>Cartão de crédito</option>
            <option>Cartão de débito</option>
          </select>
        </label>
        <label>
          Tag:{' '}
          <select name="tag" onChange={this.handleChange}>
            <option>Alimentação</option>
            <option>Lazer</option>
            <option>Trabalho</option>
            <option>Transporte</option>
            <option>Saúde</option>
          </select>
        </label>
        <label>
          Descrição: <input type="text" name="description" onChange={this.handleChange} />
        </label>

        <button type="button" onClick={ () => setExpense(this.state, this.props.fetchAPI)}>Adicionar despesa</button>
      </form>
    );
  }
}

const mapStateToProps = ({ wallet: { coinsData } }) => ({
  coinsData,
});


export default connect(mapStateToProps)(WalletTable);
