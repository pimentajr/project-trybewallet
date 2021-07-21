import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Form, Button } from 'react-bootstrap';
import { actionSetUser } from '../actions/index';

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
      email,
      validEmail: re.test(String(email).toLowerCase()),
    }));
  }

  validatePassword({ target: { value: password } }) {
    const five = 5;
    const validPassword = (password.length > five);

    this.setState(() => ({
      validPassword,
    }));
  }

  checkLogin() {
    const { validEmail, validPassword } = this.state;

    if (!validEmail || !validPassword) return true;
  }

  render() {
    const { dispatchSetUser } = this.props;
    const { email } = this.state;

    return (
      <Form>
        <Form.Group>
          <Form.Control
            data-testid="email-input"
            type="email"
            placeholder="Entre com seu email"
            onChange={ this.validateEmail }
          />
          <Form.Text className="text-muted">example@example.com</Form.Text>
        </Form.Group>

        <Form.Group>
          <Form.Control
            data-testid="password-input"
            type="password"
            placeholder="Senha"
            onChange={ this.validatePassword }
          />
          <Form.Text className="text-muted">Sua senha, por favor!</Form.Text>
        </Form.Group>

        <Link to="/carteira" className="d-grid gap-2">
          <Button
            type="button"
            variant="success"
            size="lg"
            disabled={ this.checkLogin() }
            onClick={ () => { dispatchSetUser(email); } }
          >
            Entrar
          </Button>
        </Link>
      </Form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  dispatchSetUser: (email) => dispatch(actionSetUser(email)),
});

export default connect(null, mapDispatchToProps)(LoginForm);

LoginForm.propTypes = {
  dispatchSetUser: PropTypes.func.isRequired,
};
