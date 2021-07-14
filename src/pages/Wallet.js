import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Wallet extends React.Component {
  constructor() {
    super();
    this.state = {
      expense: '',
      description: '',
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange({ value, name }) {
    this.setState({
      [name]: value,
    });
  }

  renderHeader() {
    const { user } = this.props;
    return (
      <header className="header">
        <h3 className="header-text">TrybeWallet</h3>
        <h3 data-testid="email-field" className="header-text">{user}</h3>
        <h4 data-testid="total-field" className="header-text">0</h4>
        <h4 data-testid="header-currency-field" className="header-text">BRL</h4>
      </header>
    );
  }

  renderInputExpense() {
    const { expense } = this.state;
    return (
      <form>
        <label htmlFor="expense-input">
          Valor
          <input
            type="number"
            name="expense"
            id="expense-input"
            data-testid="expense-input"
            placeholder="Valor"
            value={ expense }
            onChange={ (e) => this.handleChange(e.target) }
          />
        </label>
      </form>
    );
  }

  renderInputDescription() {
    const { description } = this.state;
    return (
      <form>
        <label htmlFor="description-input">
          Descrição
          <input
            type="text"
            name="description"
            id="description-input"
            data-testid="description-input"
            placeholder="Descrição"
            value={ description }
            onChange={ (e) => this.handleChange(e.target) }
          />
        </label>
      </form>
    );
  }

  renderSelectCurrency() {
    return (
      <form>
        <label htmlFor="selectCurrency">
          Moeda
          <select name="selectCurrency" id="selectCurrency">
            {/* <option value="valor1">Valor 1</option>
            <option value="valor2">Valor 2</option>
            <option value="valor3">Valor 3</option> */}
          </select>
          {/* value={ description }
            onChange={ (e) => this.handleChange(e.target) } */}
        </label>
      </form>
    );
  }

  renderSelectPayment() {
    return (
      <form>
        <label htmlFor="selectPayment">
          Método de pagamento
          <select name="selectPayment" id="selectPayment">
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de débito">Cartão de débito</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
          </select>
          {/* value={ description }
          onChange={ (e) => this.handleChange(e.target) } */}
        </label>
      </form>
    );
  }

  renderSelectTag() {
    return (
      <form>
        <label htmlFor="selectTag">
          Tag
          <select name="selectTag" id="selectTag">
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
          {/* value={ description }
          onChange={ (e) => this.handleChange(e.target) } */}
        </label>
      </form>
    );
  }

  render() {
    return (
      <>
        {this.renderHeader()}
        <div>
          {this.renderInputExpense()}
          {this.renderInputDescription()}
          {this.renderSelectCurrency()}
          {this.renderSelectPayment()}
          {this.renderSelectTag()}
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user.email,
});

Wallet.propTypes = {
  user: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Wallet);
