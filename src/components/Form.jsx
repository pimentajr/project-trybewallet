import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import InputText from './InputText';
import SelectField from './SelectField';

const optionPayment = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
const optionTag = ['Alimentação', 'Lazer', 'Saúde', 'Trabalho', 'Transporte'];

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Valor: '',
      Descrição: '',
      Moeda: '',
      Payment: optionPayment[0],
      Tag: optionTag[0],
    };
    this.handleChange = this.handleChange.bind(this);
    this.renderInput = this.renderInput.bind(this);
    this.renderSelect = this.renderSelect.bind(this);
    this.renderForm = this.renderForm.bind(this);
  }

  handleChange({ target: { value, name } }) {
    this.setState({
      [name]: value,
    });
  }

  renderInput(value, name) {
    return (
      <InputText value={ value } name={ name } handleChange={ this.handleChange } />
    );
  }

  renderSelect(value, name, nameState, options) {
    return (
      <SelectField
        value={ value }
        name={ name }
        nameState={ nameState }
        handleChange={ this.handleChange }
        options={ options }
      />
    );
  }

  renderForm() {
    const { Valor, Descrição, Payment, Tag, Moeda } = this.state;
    const { currencies } = this.props;
    const currenciesKeys = Object.keys(currencies);
    const currenciesFiltered = currenciesKeys.filter((currency) => currency !== 'USDT');
    return (
      <form className="form-wallet">
        {this.renderInput(Valor, 'Valor')}
        {this.renderInput(Descrição, 'Descrição')}
        {this.renderSelect(Moeda, 'Moeda', 'Moeda', currenciesFiltered)}
        {this.renderSelect(Payment, 'Método de pagamento', 'Payment', optionPayment)}
        {this.renderSelect(Tag, 'Tag', 'Tag', optionTag)}
      </form>
    );
  }

  render() {
    return (
      this.renderForm()
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

Form.propTypes = {
  currencies: PropTypes.shape({
    code: PropTypes.string,
  }).isRequired,
};

export default connect(mapStateToProps)(Form);
