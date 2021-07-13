import React from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { fetchAPI, getExpenses, fetchNewCurr, editExpense } from '../actions';
import Header from '../components/Header';
import TableExpenses from '../components/TableExpenses';
import './styles/Wallet.css';

const Alimentação = 'Alimentação';
class Wallet extends React.Component {
  constructor() {
    super();
    this.state = {
      id: 0,
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: Alimentação,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    const { dispatchCurrencies } = this.props;
    dispatchCurrencies();
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  buttonExpenses() {
    const { dispatchExpenses, fetchNew } = this.props;
    return (
      <button
        type="button"
        className="button2"
        onClick={ () => {
          fetchNew();
          dispatchExpenses(this.state);
          this.setState((prev) => ({
            id: prev.id + 1,
            value: '',
            description: '',
            currency: 'USD',
            method: 'Dinheiro',
            tag: Alimentação,
          }));
        } }
      >
        Adicionar despesa
      </button>
    );
  }

  buttonEdit() {
    const { value, description, currency, method, tag } = this.state;
    const { dispatchEdit, fetchNew } = this.props;
    return (
      <button
        type="button"
        className="button2"
        onClick={ () => {
          fetchNew();
          dispatchEdit({ value, description, currency, method, tag });
          this.setState({
            value: '',
            description: '',
            currency: 'USD',
            method: 'Dinheiro',
            tag: Alimentação,
          });
        } }
      >
        Editar despesa
      </button>
    );
  }

  labelValueDescription() {
    const { value, description } = this.state;
    return (
      <>
        <label htmlFor="value">
          Valor
          <input
            type="text"
            name="value"
            id="value"
            data-testid="value-input"
            onChange={ this.handleChange }
            value={ value }
          />
        </label>
        <label htmlFor="description">
          Descrição
          <input
            name="description"
            id="description"
            onChange={ this.handleChange }
            value={ description }
            data-testid="description-input"
          />
        </label>
      </>
    );
  }

  labelmethodTag() {
    const { method, tag } = this.state;
    return (
      <>
        <label htmlFor="method">
          Método de pagamento
          <select
            id="method"
            name="method"
            data-testid="method-input"
            onChange={ this.handleChange }
            value={ method }
          >
            <option onChange={ this.handleChange }>Dinheiro</option>
            <option onChange={ this.handleChange }>Cartão de crédito</option>
            <option onChange={ this.handleChange }>Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="tag">
          Tag
          <select
            id="tag"
            name="tag"
            onChange={ this.handleChange }
            value={ tag }
            data-testid="tag-input"
          >
            <option onChange={ this.handleChange }>Alimentação</option>
            <option onChange={ this.handleChange }>Lazer</option>
            <option onChange={ this.handleChange }>Trabalho</option>
            <option onChange={ this.handleChange }>Transporte</option>
            <option onChange={ this.handleChange }>Saúde</option>
          </select>
        </label>
      </>
    );
  }

  render() {
    const {
      stateCurrencies, stateIsLoading, stateIsEditing } = this.props;
    const { currency } = this.state;
    if (stateIsLoading) {
      return (
        <>
          <Header />
          <p>Loading...</p>
          <TableExpenses />
        </>
      );
    }
    return (
      <>
        <Header />
        <div className={ stateIsEditing ? 'form2' : 'form' }>
          <form>
            {this.labelValueDescription()}
            <label htmlFor="currency">
              Moeda
              <select
                name="currency"
                id="currency"
                data-testid="currency-input"
                onChange={ this.handleChange }
                value={ currency }
              >
                {Object.keys(stateCurrencies)
                  .filter((e) => e !== 'USDT')
                  .map((e) => stateCurrencies[e])
                  .map((e, i) => (
                    <option key={ i } onChange={ this.handleChange }>
                      {e.code}
                    </option>
                  ))}
              </select>
            </label>
            {this.labelmethodTag()}
          </form>
          {stateIsEditing ? this.buttonEdit() : this.buttonExpenses()}
        </div>
        <TableExpenses />
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  stateCurrencies: state.wallet.currencies,
  stateIsLoading: state.wallet.isLoading,
  stateIsEditing: state.wallet.isEditing,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchCurrencies: () => dispatch(fetchAPI()),
  dispatchExpenses: (state) => {
    dispatch(getExpenses(state));
  },
  fetchNew: () => dispatch(fetchNewCurr()),
  dispatchEdit: (state) => dispatch(editExpense(state)),
});

Wallet.propTypes = {
  dispatchCurrencies: PropTypes.func.isRequired,
  dispatchEdit: PropTypes.func.isRequired,
  dispatchExpenses: PropTypes.func.isRequired,
  fetchNew: PropTypes.func.isRequired,
  stateCurrencies: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
  stateIsEditing: PropTypes.bool.isRequired,
  stateIsLoading: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
