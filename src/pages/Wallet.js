import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Select from './Select';
import Table from './table';
import { addUserSpending, getCoinThunk } from '../actions';
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
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    const { setCoin } = this.props;
    setCoin();
    // const { setAllCoins } = this.props;
    // setAllCoins();
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  async handleClick() {
    const {
      addSpending,
    } = this.props;

    const exchangeRates = await setAPI();

    const { id, description, method, tag, value, currency } = this.state;
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
    const { getCoin } = this.props;
    const total = getCoin.reduce((soma, itens) => soma
    + parseFloat(itens.exchangeRates[itens.currency].ask * itens.value), 0).toFixed(2);
    const filterCoin = userCoin.filter((item) => item !== 'USDT');
    return (
      <div>
        <header>
          <h3>Olá: </h3>
          <h4 data-testid="email-field">{userMail}</h4>
          <h3>Despesa total </h3>
          <h4 data-testid="total-field">{total}</h4>
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
  getCoin: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  addSpending: (payload) => dispatch(addUserSpending(payload)),
  setCoin: () => dispatch(getCoinThunk()),
  // setAllCoins: () => dispatch(setCoinThunk()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);

Wallet.propTypes = {
  currency: PropTypes.arrayOf,
}.isRequired;
