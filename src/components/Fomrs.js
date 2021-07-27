import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import FormsBtn from './FormsBtn';
import EditDispense from './EditDispense';
import Tag from './Tag';

class Fomrs extends Component {
  constructor(props) {
    super(props);
    this.up = this.up.bind(this);
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

  up(e) {
    this.setState({
      [e.target.id]: e.target.value,
    });
  }

  render() {
    const { editForm } = this.props;
    if (editForm === true) return <EditDispense />;
    const { currency = [] } = this.props;
    return (
      <form className="forms" id="forms">
        <label htmlFor="value">
          Valor:
          <input
            onChange={ this.up }
            id="value"
            className="Valor"
            type="text"
          />
        </label>
        <label htmlFor="description">
          Descrição:
          <textarea onChange={ this.up } id="description" type="text" />
        </label>
        <label htmlFor="currency">
          Moeda:
          <select onChange={ this.up } id="currency">
            {
              currency
                .map((item, index) => (
                  <option key={ index } value={ item }>{item}</option>))
            }
          </select>
        </label>
        <label htmlFor="method">
          Método de pagamento:
          <select onChange={ this.up } id="method">
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
        </label>
        <Tag up={ this.up } />
        <FormsBtn toma={ this.state } initialState={ this.initialState } />
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  currency: state.wallet.currencies,
  editForm: state.wallet.editForm,
});

export default connect(mapStateToProps)(Fomrs);

Fomrs.propTypes = {
  currency: PropTypes.arrayOf(PropTypes.object).isRequired,
  editForm: PropTypes.bool.isRequired,
};

// Source: auxílio do colega Douglas e consulta ao repositório do Marcos
