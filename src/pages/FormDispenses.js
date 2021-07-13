import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import requestAPI from '../services/requestAPI';
import { fetchAPI } from '../actions';

class FormDispenses extends Component {
  constructor(props) {
    super(props);
    this.valuesAPI = this.valuesAPI.bind(this);
  }

  componentDidMount() {
    const { loadingValues } = this.props;
    return loadingValues();
  }

  valuesAPI() {
    const { currencies } = this.props;
    console.log(currencies);

    return (
      currencies.map((currencie) => (
        <option key={ currencie } value={ currencie }>{currencie}</option>
      ))
    );
  }

  render() {
    console.log(requestAPI());
    return (
      <div>
        <form>
          <label htmlFor="value">
            Valor
            <input type="text" name="value" id="value" />
          </label>
          <label htmlFor="description">
            Descrição
            <input type="text" name="description" id="description" />
          </label>
          <label htmlFor="value-coins">
            Moeda
            <select id="value-coins">
              {this.valuesAPI()}
            </select>
          </label>
          <label htmlFor="payment-method">
            Método de pagamento
            <select id="payment-method">
              <option value="money">Dinheiro</option>
              <option value="credit-card">Cartão de crédito</option>
              <option value="debit-card">Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="tag-dispenses">
            Tag
            <select id="tag-dispenses">
              <option value="food">Alimentação</option>
              <option value="freetime">Lazer</option>
              <option value="work">Trabalho</option>
              <option value="transport-healt">Transporte e saúde</option>
            </select>
          </label>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  loadingValues: () => dispatch(fetchAPI()),
});

FormDispenses.propTypes = {
  currencies: PropTypes.arrayOf,
  loadingValues: PropTypes.func,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(FormDispenses);
