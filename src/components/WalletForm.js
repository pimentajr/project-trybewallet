import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchCurrencies, sendWalletInfo } from '../actions';

class WalletForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      value: 0,
      description: '',
      currency: 'USD',
      paymentForm: 'Dinheiro',
      tag: 'Alimentação',
    };
    this.inputHandle = this.inputHandle.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const { fetchCur } = this.props;
    fetchCur();
  }

  inputHandle({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  handleSubmit() {
    const { fetchCur, sendInfo, rates } = this.props;
    fetchCur();
    sendInfo({ ...this.state, exchangeRates: rates });
    this.setState((pState) => ({
      id: pState.id + 1,
    }));
  }

  render() {
    const { cur } = this.props;
    const currArray = Object.keys(cur).filter((coin) => coin !== 'USDT');
    return (
      <form>
        <label htmlFor="value">
          Valor:
          <input type="number" name="value" id="value" onChange={ this.inputHandle } />
        </label>
        <label htmlFor="description">
          Descrição:
          <input
            type="text"
            id="description"
            name="description"
            onChange={ this.inputHandle }
          />
        </label>
        <label htmlFor="currency">
          Moeda:
          <select id="currency" name="currency" onChange={ this.inputHandle }>
            {currArray.map((value, index) => <option key={ index }>{ value }</option>)}
          </select>
        </label>
        <label htmlFor="payment">
          Método de pagamento:
          <select id="payment" name="paymentForm" onChange={ this.inputHandle }>
            <option value="dinheiro">Dinheiro</option>
            <option value="credito">Cartão de crédito</option>
            <option value="debito">Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="tag">
          Tag:
          <select id="tag" name="tag" onChange={ this.inputHandle }>
            <option value="alimentacao">Alimentação</option>
            <option value="lazer">Lazer</option>
            <option value="trabalho">Trabalho</option>
            <option value="transporte">Transporte</option>
            <option value="saude">Saúde</option>
          </select>
        </label>
        <button type="button" onClick={ this.handleSubmit }>Adicionar despesa</button>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchCur: () => dispatch(fetchCurrencies()),
  sendInfo: (state) => dispatch(sendWalletInfo(state)),
});
const mapStateToProps = (state) => ({
  cur: state.wallet.currencies,
  rates: state.wallet.rates,
});

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);

WalletForm.propTypes = {
  fetchCur: PropTypes.func.isRequired,
  cur: PropTypes.objectOf.isRequired,
  rates: PropTypes.objectOf(Object).isRequired,
  sendInfo: PropTypes.func.isRequired,
};
