import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as userAction from '../actions';

class Login extends Component {
  constructor() {
    super();

    this.handleChange = this.handleChange.bind(this);
    this.addTaskOnStoreAndRedirect = this.addTaskOnStoreAndRedirect.bind(this);

    this.state = {
      email: '',
      password: 0,
      btnDisabled: true,
    };
  }

  validateCredentials() {
    const { email, password } = this.state;

    const reEmail = /^([\w\d._\-#])+@([\w\d._\-#]+[.][\w\d._\-#]+)+$/;
    const re = /^.{5,}$/;
    if (reEmail.test(email) && re.test(String(password))) {
      this.setState({ btnDisabled: false });
    } else {
      this.setState({ btnDisabled: true });
    }
  }

  handleChange({ target: { name, value } }) {
    this.setState({
      [name]: value,
    });

    this.validateCredentials();
  }

  addTaskOnStoreAndRedirect() {
    const { email } = this.state;
    const { addEmail } = this.props;

    addEmail(email);

    const { history } = this.props;

    history.push('/carteira');
  }

  render() {
    const { btnDisabled } = this.state;
    return (
      <div>
        <form>
          <label htmlFor="input-email">
            Email:
            <input
              data-testid="email-input"
              type="email"
              placeholder="Digite seu email..."
              name="email"
              id="input-email"
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="input-password">
            Senha:
            <input
              data-testid="password-input"
              type="password"
              placeholder="Digite sua senha..."
              name="password"
              id="input-password"
              onChange={ this.handleChange }
            />
          </label>
        </form>
        <button
          disabled={ btnDisabled }
          type="button"
          onClick={ this.addTaskOnStoreAndRedirect }
        >
          Entrar
        </button>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  addEmail: (email) => dispatch(userAction.addEmail(email)),
});

export default connect(null, mapDispatchToProps)(Login);

Login.propTypes = {
  addEmail: PropTypes.func.isRequired,
  history: {
    push: PropTypes.func,
  }.isRequired,
};
