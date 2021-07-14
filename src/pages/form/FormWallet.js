import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addCurrencies } from '../../actions/index';
import BtnFormWallet from './BtnFormWallet';

class FormWallet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currency: 'USD',
      description: '',
      method: 'Dinheiro',
      tag: 'Alimentação',
      value: 0,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    const { dispatchAddCurrencies } = this.props;
    dispatchAddCurrencies();
  }

  handleChange({ target: { value, name } }) {
    this.setState({
      [name]: value,
    });
  }

  firstHtml() {
    const { value, description } = this.state;
    return (
      <>
        <label htmlFor="value">
          Valor
          <input
            type="text"
            name="value"
            id="value"
            onChange={ this.handleChange }
            value={ value }
          />
        </label>
        <label htmlFor="description">
          Descrição
          <input
            type="text"
            name="description"
            id="description"
            onChange={ this.handleChange }
            value={ description }
          />
        </label>
      </>
    );
  }

  render() {
    const { coins } = this.props;
    const { currency, method, tag } = this.state;
    return (
      <form>
        {this.firstHtml()}
        <label htmlFor="currency">
          Moeda
          <select
            name="currency"
            onChange={ this.handleChange }
            value={ currency }
            id="currency"
          >
            {coins.map((coin, index) => (
              <option key={ index } value={ coin }>{coin}</option>
            ))}
          </select>
        </label>
        <label htmlFor="method" value={ method }>
          Método de pagamento
          <select name="method" id="method" onChange={ this.handleChange }>
            <option>Dinheiro</option>
            <option>Cartão de crédito</option>
            <option>Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="tag" value={ tag }>
          Tag
          <select name="tag" id="tag" onChange={ this.handleChange }>
            <option>Alimentação</option>
            <option>Lazer</option>
            <option>Trabalho</option>
            <option>Transporte</option>
            <option>Saúde</option>
          </select>
        </label>
        <BtnFormWallet state={ this.state } />
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  coins: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchAddCurrencies: () => dispatch(addCurrencies()),
});

FormWallet.propTypes = {
  dispatchAddCurrencies: PropTypes.func.isRequired,
  coins: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(FormWallet);
