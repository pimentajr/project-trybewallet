import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Select from './Select';
import Table from './table';
import { addUserSpending, getCoinThunk } from '../actions';
import Inputs from './inputs';

class Wallet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      valor: 0,
      descricao: '',
      moeda: '',
      pagamento: '',
      tag: '',
      valueTotal: 0,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    const { setCoin } = this.props;
    setCoin();
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  handleClick() {
    const {
      countSpending,
      addSpending,
    } = this.props;

    const id = countSpending.length + 1;
    addSpending({ ...this.state, id });
  }

  render() {
    const { userMail } = this.props;
    const { userCoin } = this.props;
    const filterCoin = userCoin.filter((item) => item !== 'USDT');
    const { valueTotal } = this.state;
    return (
      <div>
        <header>
          <h3>Olá: </h3>
          <h4 data-testid="email-field">{userMail}</h4>
          <h3>Despesa total: </h3>
          <h4 data-testid="total-field">{valueTotal}</h4>
          <h3>Câmbio atual: </h3>
          <h4 data-testid="header-currency-field">BRL</h4>
          <form>
            <Inputs handleChange={ this.handleChange } />
            <label htmlFor="moeda">
              Moeda:
              <select
                name="moeda"
                id="moeda"
                onChange={ (e) => this.setState({ moeda: e.target.value }) }
              >
                {filterCoin.map((item, key) => (
                  <option
                    key={ key }
                    value={ item }
                  >
                    {item}
                  </option>))}
              </select>
              <Select handleChange={ this.handleChange } />
            </label>
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
  userTotal: state.spending.spending.exchangeRates,
  countSpending: state.spending.spending,
});

const mapDispatchToProps = (dispatch) => ({
  addSpending: (payload) => dispatch(addUserSpending(payload)),
  setCoin: () => dispatch(getCoinThunk()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);

Wallet.propTypes = {
  currency: PropTypes.arrayOf,
}.isRequired;
