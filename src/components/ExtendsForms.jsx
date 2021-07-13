import React, { Component } from 'react';
import { connect } from 'react-redux';

class ExtendsForms extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currency: '',
      method: 'Dinheiro',
      tag: 'Alimentação',
    };
    this.handleInput = this.handleInput.bind(this);
    this.btnAddExpenses = this.btnAddExpenses.bind(this);
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
    const { method, currency, tag } = this.state;
    return (
      <div>
        <label
          htmlFor="moedaSelect"
        >
          Moeda:
          <select
            id="moedaSelect"
            type="number"
            name="moeda"
            value={ currency }
            onChange={ (e) => this.handleInput(e) }
          />
        </label>
        <label htmlFor="modePayment">
          Método de pagamento:
          <select
            type="number"
            id="modePayment"
            name="method"
            value={ method }
            onChange={ (e) => this.handleInput(e) }
          >
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="tag">
          Tag:
          <select
            type="number"
            id="tag"
            name="tag"
            value={ tag }
            onChange={ (e) => this.handleInput(e) }
          >
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
        </label>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  payload: state.wallet.payload,
});

const mapDispatchToProps = (dispatch) => ({
  moeda: (state) => dispatch(setCoins(state)),
});
export default connect(mapStateToProps, mapDispatchToProps)(ExtendsForms);
