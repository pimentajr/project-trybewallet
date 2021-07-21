import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Select from './Select';
import Table from './table';
import { addUserSpending, getCoinThunk, setCoinThunk } from '../actions';
import Inputs from './inputs';
import setAPI from '../services/API';

class Wallet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      value: 0,
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      valueTotal: 0,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.requestApi = this.requestApi.bind(this);
  }

  componentDidMount() {
    const { setCoin } = this.props;
    setCoin();
    const { setAllCoins } = this.props;
    setAllCoins();
    const isso = setAPI();
    console.log('hi', isso);
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  async requestApi() {
    try {
      const response = await this.setAPI;
      return response;
    } catch (error) {
      return error;
    }
  }

  handleClick() {
    const {
      addSpending,
      exchangeRates,
    } = this.props;

    console.log('asss', this.requestApi());

    const { currency, value } = this.state;
    const valorTotal = (exchangeRates[currency].ask * value);
    const { valueTotal } = this.state;
    console.log(typeof valueTotal);
    console.log(typeof valorTotal);
    this.setState({ valueTotal: valueTotal + valorTotal });

    const { id, description, method, tag } = this.state;
    addSpending({ currency,
      value,
      description,
      method,
      tag,
      id,
      exchangeRates,
    });
    this.setState({ id: id + 1 });
  }

  render() {
    const { userMail } = this.props;
    const { userCoin } = this.props;
    const filterCoin = userCoin.filter((item) => item !== 'USDT');
    const { valueTotal } = this.state;
    (valueTotal).toFixed(2);
    return (
      <div>
        <header>
          <h3>Olá: </h3>
          <h4 data-testid="email-field">{userMail}</h4>
          <h3>Despesa total </h3>
          <h4 data-testid="total-field">{valueTotal}</h4>
          <h3>Câmbio atual </h3>
          <h4 data-testid="header-currency-field">BRL</h4>
          <form>
            <Inputs handleChange={ this.handleChange } />
            <label htmlFor="moeda">
              Moeda
              <select
                name="currency"
                id="moeda"
                onChange={ (e) => this.setState({ currency: e.target.value }) }
              >
                {filterCoin.map((item, key) => (
                  <option
                    key={ key }
                    value={ item }
                  >
                    {item}
                  </option>))}
              </select>
            </label>
            <Select handleChange={ this.handleChange } />
            <button
              type="button"
              onClick={ this.handleClick }
              id="butom"
            >
              Adicionar despesa
            </button>
          </form>
        </header>
        <Table />
      </div>);
  }
}

const mapStateToProps = (state) => ({
  userMail: state.user.email,
  userCoin: state.wallet.currencies,
  exchangeRates: state.wallet.exchangeRates,
});

const mapDispatchToProps = (dispatch) => ({
  addSpending: (payload) => dispatch(addUserSpending(payload)),
  setCoin: () => dispatch(getCoinThunk()),
  setAllCoins: () => dispatch(setCoinThunk()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);

Wallet.propTypes = {
  currency: PropTypes.arrayOf,
}.isRequired;
