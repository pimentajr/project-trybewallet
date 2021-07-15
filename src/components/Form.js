import React from 'react';
import { connect } from 'react-redux';
import { fetchMoeda } from '../actions';

class form extends React.Component {
  componentDidMount() {
    const { fetchCoin } = this.props;
    fetchCoin();
  }

  handleSelectTag() {
    return (
      <label htmlFor="tag">
        Tag
        <select
          data-testid="tag-input"
          name="tag"
          id="tag"
        // value={ tag }
        // onChange={ this.handleChange }
        >
          <option value="Alimentação">Alimentação</option>
          <option value="Lazer">Lazer</option>
          <option value="Trabalho">Trabalho</option>
          <option value="Transporte">Transporte</option>
          <option value="Saúde">Saúde</option>
        </select>
      </label>
    );
  }

  render() {
    const { coins } = this.props;
    console.log(coins);
    return (
      <div className="wrapper">
        <form>
          <label htmlFor="value">
            Valor
            <input type="text" name="value" id="value" />
          </label>
          <label htmlFor="description">
            Descrição
            <input type="text" name="description" id="description" />
          </label>
          <label htmlFor="currency">
            Moeda
            <select
              data-testid="currency-input"
              name="currency"
              id="currency"
              // value={ currencies }
            >
              {coins.map((coin, index) => (
                <option value={ coin } key={ index }>{coin}</option>))}
            </select>
          </label>
          <label htmlFor="method">
            Método de pagamento
            <select
              data-testid="method-input"
              name="method"
              id="method"
            // value={method}
            // onChange={this.handleChange}
            >
              <option value="dinheiro">Dinheiro</option>
              <option value="cartão de crédito">Cartão de Crédito</option>
              <option value="cartão de débito">Cartão de Débito</option>
            </select>
          </label>
          {this.handleSelectTag()}
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchCoin: () => dispatch(fetchMoeda()),

});

const mapStateToProps = (state) => ({
  coins: state.wallet.currencies,
});

export default connect(mapStateToProps, mapDispatchToProps)(form);
