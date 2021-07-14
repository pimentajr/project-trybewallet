import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import '../App.css';
import Form from '../components/Form';
import { fetchCurrencies } from '../actions';

class Wallet extends React.Component {
  constructor() {
    super();

    this.state = {
      cambio: 'BRL',
    };
  }

  componentDidMount() {
    const { pegandoMoedas } = this.props;
    pegandoMoedas();
  }

  render() {
    const { userEmail, expenses } = this.props;
    const { cambio } = this.state;
    return (
      <div>
        <div className="wallet-container">
          <section>
            <img
              className="trybe-img"
              src="/public/v7oifu5eirdxepzyg0p0.png"
              alt="símbolo Trybe"
            />
          </section>
          <section>
            <span data-testid="email-field">{userEmail}</span>
            <span data-testid="total-field">
              {expenses.reduce((acc, expense) => {
                const selectedCurrency = expense.currency;
                return Number(expense.exchangeRates[selectedCurrency].ask)
                  * Number(expense.value) + acc;
              }, 0)}
            </span>
            <span data-testid="header-currency-field">{cambio}</span>
          </section>
        </div>
        <Form />
      </div>
    );
  }
}

Wallet.propTypes = {
  userEmail: PropTypes.func.isRequired,
  pegandoMoedas: PropTypes.func.isRequired,
  expenses: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  userEmail: state.user.email,
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  pegandoMoedas: () => dispatch(fetchCurrencies()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
