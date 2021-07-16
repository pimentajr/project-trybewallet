import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Form from './Form';
import Header from './Header';
import { fetchAPI, fetchExpenses } from '../actions';
import Table from './Table';

class Wallet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      value: 0,
      description: '',
      currency: 'USD',
      payment: 'Dinheiro',
      tag: 'Alimentação',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    const { requestApi } = this.props;
    requestApi();
    fetchExpenses();
  }

  handleChange(name, value) {
    this.setState({
      [name]: value,
    });
  }

  handleClick() {
    const { setExpenses } = this.props;
    setExpenses(this.state);
    this.setState({
      value: '',
      description: '',
      currency: 'USD',
      payment: 'Dinheiro',
      tag: 'Alimentação',
    });
  }

  render() {
    const { value, description, currency, payment, tag } = this.state;
    return (
      <div>
        <div>
          TrybeWallet
        </div>
        <Header />
        <Form
          onChange={ this.handleChange }
          value={ value }
          description={ description }
          currency={ currency }
          payment={ payment }
          tag={ tag }
          onClick={ this.handleClick }
        />
        <button
          type="button"
          onClick={ () => this.handleClick }
        >
          Adicionar Despesas
        </button>
        <Table />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  requestApi: () => dispatch(fetchAPI()),
  setExpenses: () => dispatch(fetchExpenses()),
});

Wallet.propTypes = {
  requestApi: PropTypes.func,
  dispatchExpenses: PropTypes.func,
}.isRequest;

export default connect(null, mapDispatchToProps)(Wallet);
