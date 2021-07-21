import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Forms extends Component {
  constructor(props) {
    super(props);
    this.handlerChanges = this.handlerChanges.bind(this);
    this.renderImput = this.renderImput.bind(this);
    this.initialState = this.initialState.bind(this);
  }

  initialState() {
    const state = {
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    };
    return this.setState(state);
  }

  handlerChanges({ target: { value, id } }) {
    this.setState({
      [id]: value,
    });
  }

  renderImput() {
    return (
      <label htmlFor="tag" id="tag">
        Tag
        <select id="tag" onChange={ this.handlerChanges }>
          <option value="Alimentação">Alimentação</option>
          <option value="Lazer">Lazer</option>
          <option value="Transporte">Transporte</option>
          <option value="Saúde">Saúde</option>
        </select>
      </label>
    );
  }

  render() {
    const { getcurrenciesFromStore } = this.props;
    return (
      <div>
        <form>
          <label htmlFor="value">
            Valor
            <input
              type="text"
              id="value"
              onChange={ this.handlerChanges }
            />
          </label>
          <label htmlFor="description">
            Descrição
            <textarea
              type="text"
              id="description"
              onChange={ this.handlerChanges }
            />
          </label>
          <label htmlFor="currency">
            Moeda
            <select
              type="text"
              id="currency"
              onChange={ this.handlerChanges }
            >
              {
                getcurrenciesFromStore
                  .map((item, index) => <option key={ index }>{ item }</option>)
              }
            </select>
          </label>
          <label htmlFor="method">
            Método de pagamento
            <select id="method" onChange={ this.handlerChanges }>
              <option value="Dinheiro">Dinheiro</option>
              <option value="Cartão de crédito">Cartão de crédito</option>
              <option value="Cartão de débito">Cartão de débito</option>
            </select>
          </label>
          {this.renderImput()}
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  getcurrenciesFromStore: state.wallet.currencies,
});

export default connect(mapStateToProps)(Forms);

Forms.propTypes = {
  getcurrenciesFromStore: PropTypes.arrayOf(PropTypes.object).isRequired,
};
