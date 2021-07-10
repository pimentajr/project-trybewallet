import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setCoins } from '../actions';

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      valorDespesa: 0,
      description: '',
      nameCoins: '',
      modelPayment: 'Dinheiro',
      tag: 'Alimentação',
    };
    this.handleInput = this.handleInput.bind(this);
  }

  componentDidMount() {
    const { moeda } = this.props;
    moeda();
  }

  handleInput({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  render() {
    const { valorDespesa, description, modelPayment, nameCoins, tag } = this.state;
    const { payload } = this.props;
    return (
      <form>
        <label
          htmlFor="valorInput"
        >
          Valor:
          <input
            type="number"
            id="valorInput"
            name="valorDespesa"
            value={ valorDespesa }
            onChange={ (e) => this.handleInput(e) }
          />
        </label>
        <label htmlFor="descriptionInput">
          Descrição:
          <input
            type="number"
            id="descriptionInput"
            name="description"
            value={ description }
            onChange={ (e) => this.handleInput(e) }
          />
        </label>
        <label
          htmlFor="moedaSelect"
        >
          Moeda:
          <select
            id="moedaSelect"
            type="number"
            name="moeda"
            value={ nameCoins }
            onChange={ (e) => this.handleInput(e) }
          >
          </select>
        </label>
        <label htmlFor="modePayment">
          Método de pagamento:
          <select type="number" id="modePayment" name="modelPayment" value={ modelPayment } onChange={ (e) => this.handleInput(e) }>
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="tag">
          Tag:
          <select type="number" id="tag" name="tag" value={ tag } onChange={ (e) => this.handleInput(e) }>
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
        </label>
      </form>
    );
  }
}
const mapStateToProps = (state) => ({
  payload: state.wallet.payload,
});

const mapDispatchToProps = (dispatch) => ({
  moeda: (state) => dispatch(setCoins(state)) });

export default connect(mapStateToProps, mapDispatchToProps)(Form);
