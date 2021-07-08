import React from 'react';
import { connect } from 'react-redux';
import { fetchCoinsAPI } from '../actions';

class FormsWallet extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchCoinsAPI());
  }

  render() {
    const { coinsData } = this.props;
    let siglas = [];
 
    if (coinsData !== undefined) {
      delete coinsData['USDT'];
      siglas = Object.keys(coinsData);
    }

    return (
      <form>
        <label>
          Valor: <input type="text" />
        </label>
        <label>
          Moeda:{' '}
          <select>
            {siglas.map((sigla, index) => (
              <option key={index} value={sigla}>
                {sigla}
              </option>
            ))}
          </select>
        </label>
        <label>
          Método de Pagamento:{' '}
          <select>
            <option value="dinheiro">Dinheiro</option>
            <option value="credito">Cartão de crédito</option>
            <option value="debito">Cartão de débito</option>
          </select>
        </label>
        <label>
          Tag:{' '}
          <select>
            <option value="alimentacao">Alimentação</option>
            <option value="lazer">Lazer</option>
            <option value="trabalho">Trabalho</option>
            <option value="transporte">Transporte</option>
            <option value="saude">Saúde</option>
          </select>
        </label>
        <label>
          Descrição: <input type="text" />
        </label>
      </form>
    );
  }
}

const mapStateToProps = ({ wallet: { coinsData } }) => ({
  coinsData,
});

export default connect(mapStateToProps)(FormsWallet);
