import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as currencyActions from '../actions';
import TableWallet from './TableWallet';

class WalletComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      description: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    const { acronym } = this.props;
    acronym();
  }

  handleChange(e) {
    const { name } = e.target;
    this.setState({
      [name]: e.target.value,
    });
  }

  handleClick() {
    const { acronym } = this.props;
    acronym();
    const { expenses, id } = this.props;
    expenses(this.state, id);
  }

  render() {
    const { curr } = this.props;
    return (
      <div>
        <form>
          <label htmlFor="value">
            Valor
            <input type="text" name="value" id="value" onChange={ this.handleChange } />
          </label>
          <label htmlFor="Moeda">
            Moeda
            <select id="Moeda" name="currency" onChange={ this.handleChange }>
              {
                curr && curr.map((e, index) => <option key={ index }>{e.code}</option>)
              }
            </select>
          </label>
          <label htmlFor="metodo-pagamento">
            Método de pagamento
            <select name="method" id="metodo-pagamento" onChange={ (this.handleChange) }>
              <option>Dinheiro</option>
              <option>Cartão de crédito</option>
              <option>Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="tag">
            Tag
            <select name="tag" id="tag" onChange={ this.handleChange }>
              <option>Alimentação</option>
              <option>Lazer</option>
              <option>Trabalho</option>
              <option>Transporte</option>
              <option>Saúde</option>
            </select>
          </label>
          <label htmlFor="descr">
            Descrição
            <input type="text" name="descr" id="descr" onChange={ this.handleChange } />
          </label>
          <button type="button" onClick={ this.handleClick }>Adicionar despesa</button>
        </form>
        <TableWallet />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  curr: state.wallet.allCoins,
  id: state.wallet.id,
});

const mapDispatchToProps = (dispatch) => ({
  acronym: () => dispatch(currencyActions.fetchCoin()),
  expenses: (payload, id) => dispatch(currencyActions.addExpensesAction(payload, id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(WalletComponent);
WalletComponent.propTypes = {
  showMail: PropTypes.func,
}.isRequired;
