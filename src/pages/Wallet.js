import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchCoins, setWallet } from '../actions';
import Form from '../components/Form';
import Header from '../components/Header';
import Button from '../components/Button';

class Wallet extends React.Component {
  constructor(props) {
    super(props);
    const { expenses } = props;

    this.state = {
      id: 0,
      total: 0,
      value: '',
      description: '',
      currency: '',
      payment: '',
      tag: '',
    };

    this.startFetch = this.startFetch.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.startFetch();
  }

  startFetch() {
    const { start } = this.props;
    start();
  }

  addCoin(payload) {
    const { pay } = this.props;
    this.startFetch();
    pay(payload);
  }

  handleChange({ target }) {
    const { id, value } = target;
    const { expenses } = this.props;
    this.setState({ id: expenses.length, [id]: value });
  }

  render() {
    const { email, currencies, expenses } = this.props;
    const obj = { ...this.state, exchangeRates: expenses };
    const { total } = this.state;
    return (
      <div>
        <Header email={ email } total={ total } />
        <Form currencies={ currencies } handleChange={ this.handleChange } />
        <Button value="Adicionar despesa" onClick={ () => this.addCoin(obj) } />
      </div>
    );
  }
}

Wallet.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  email: PropTypes.string.isRequired,
  expenses: PropTypes.string.isRequired,
  pay: PropTypes.func.isRequired,
  start: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  start: () => dispatch(fetchCoins()),
  pay: (payload) => dispatch(setWallet(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
