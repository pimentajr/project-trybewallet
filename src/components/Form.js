import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchApi } from '../actions';
import Button from './Button';
import Description from './Description';
import Value from './Value';

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.handlerChange = this.handlerChange.bind(this);
    this.state = {
      value: 0,
      currency: '',
      method: '',
      tag: '',
      description: '',
    };
  }

  handlerChange({ target }) {
    const { name, value } = target;

    this.setState({
      [name]: value,
    });
  }

  render() {
    const { currencies, funcExpenses } = this.props;
    const { value, currency, method, tag, description } = this.state;

    return (
      <form>
        <Value handlerChange={ this.handlerChange } value={ value } />
        <Description handlerChange={ this.handlerChange } value={ description } />
        <label htmlFor="moeda">
          Moeda:
          <select id="moeda" onChange={ this.handlerChange } name="currency">
            { currencies.map((valor) => (
              <option
                key={ currency }
                value={ valor }
              >
                {valor}
              </option>)) }
          </select>
        </label>
        <label htmlFor="pagamento">
          Método de Pagamento:
          <select
            id="pagamento"
            name="method"
            value={ method }
            onChange={ this.handlerChange }
          >
            <option>Dinheiro</option>
            <option>Cartão de crédito</option>
            <option>Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="tag">
          Tag
          <select id="tag" name="tag" value={ tag } onChange={ this.handlerChange }>
            <option>Alimentação</option>
            <option>Lazer</option>
            <option>Trabalho</option>
            <option>Transporte</option>
            <option>Saúde</option>
          </select>
        </label>
        <Button expense={ funcExpenses } state={ this.state } />
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  funcExpenses: (expenses) => dispatch(fetchApi(expenses)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Form);

Form.propTypes = {
  map: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  funcExpenses: PropTypes.arrayOf(PropTypes.string).isRequired,
};
