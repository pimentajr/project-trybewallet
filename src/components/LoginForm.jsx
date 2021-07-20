import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Button } from 'react-bootstrap';

class LoginForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      validEmail: false,
      validPassword: false,

    };

    this.validateEmail = this.validateEmail.bind(this);
    this.validatePassword = this.validatePassword.bind(this);
    this.checkLogin = this.checkLogin.bind(this);
  }

  validateEmail({ target: { value: email } }) {
    const re = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/; // usado pela W3E
    this.setState(() => ({
      validEmail: re.test(String(email).toLowerCase()),
    }));
  }

  validatePassword({ target: { value: password } }) {
    const validPassword = (password.length > 5);

    this.setState(() => ({
      validPassword,
    }));
  }

  checkLogin() {
    const { validEmail, validPassword } = this.state;

    if (!validEmail || !validPassword) return 'true';
  }

  render() {
    return (
      <Form>
        <Form.Group>
          <Form.Control
            data-testid="email-input"
            type="email"
            placeholder="Entre com seu email"
            onChange={ this.validateEmail }
          />
          <Form.Text class="text-muted">example@example.com</Form.Text>
        </Form.Group>

        <Form.Group>
          <Form.Control
            data-testid="password-input"
            type="password"
            placeholder="Senha"
            onChange={ this.validatePassword }
          />
          <Form.Text class="text-muted">Sua senha, por favor!</Form.Text>
        </Form.Group>

        <div className="d-grid gap-2">
          <Button
            type="button"
            variant="success"
            size="lg"
            disabled={ this.checkLogin() }
          >
            Entrar
          </Button>
        </div>
      </Form>
    );
  }
}

export default LoginForm;
