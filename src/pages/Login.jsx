import React from 'react';
import { Button, Form } from 'react-bootstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../actions';
import { Container } from '../styles';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: { value: '', valid: false },
      password: { value: '', valid: false },
    };
    this.handleChange = this.handleChange.bind(this);
    this.submitButton = this.submitButton.bind(this);
  }

  submitButton() {
    const { email: { value } } = this.state;
    const { loginFunc, history } = this.props;
    loginFunc(value);
    history.push('/carteira');
  }

  handleChange({ target }) {
    const { type, value } = target;
    let valid = false;
    const six = 6;
    switch (type) {
    case 'email':
      valid = value.includes('.com') && value.includes('@');
      this.setState({
        [type]: { value, valid },
      });
      break;
    case 'password':
      valid = value.length >= six;
      this.setState({
        [type]: { value, valid },
      });
      break;
    default:
      this.setState({
        [type]: value,
      });
    }
  }

  render() {
    const { email, password } = this.state;
    return (
      <Container dark className="d-flex">
        <Form className="shadow-lg p-4 mb-5 bg-light rounded">
          <h1>Trybe Wallet</h1>
          <Form.Control
            className="my-3"
            size="lg"
            type="email"
            data-testid="email-input"
            placeholder="Email"
            value={ email.value }
            onChange={ this.handleChange }
            required
          />
          <Form.Control
            className="my-3"
            size="lg"
            type="password"
            placeholder="Senha"
            data-testid="password-input"
            value={ password.value }
            onChange={ this.handleChange }
            required
          />
          <Button
            size="lg"
            disabled={ !(email.valid && password.valid) }
            variant={ (email.valid && password.valid) ? 'info' : 'secondary' }
            onClick={ this.submitButton }
          >
            Entrar
          </Button>
        </Form>
      </Container>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  loginFunc: (email) => dispatch(login(email)),
});

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  loginFunc: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
