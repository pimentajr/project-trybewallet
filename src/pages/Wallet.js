import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Form from './Form';
import Header from './Header';
import { fetchAPI } from '../actions';

class Wallet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      description: '',
      currency: 'USD',
      payment: 'Dinheiro',
      tag: 'Alimentação',
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    const { requestApi } = this.props;
    requestApi();
  }

  handleChange(name, value) {
    this.setState({
      [name]: value,
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
        />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  requestApi: () => dispatch(fetchAPI()),
});

Wallet.propTypes = {
  requestApi: PropTypes.func,
}.isRequest;

export default connect(null, mapDispatchToProps)(Wallet);
