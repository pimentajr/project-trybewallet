import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const MIN_PASSWORD_LENGTH = 6;
const EMAIL_REGX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  onSubmit() {
    const { email, password } = this.state;
    const { onSubmit } = this.props;
    onSubmit({ email, password });
  }

  render() {
    const { email, password } = this.state;
    const isEmailValid = EMAIL_REGX.test(email);
    const isPasswordValid = password.length >= MIN_PASSWORD_LENGTH;
    const isFormValid = isEmailValid && isPasswordValid;

    return (
      <div>
        <label htmlFor="input-email">
          <input
            value={ email }
            onChange={ this.onChange }
            name="email"
            id="input-email"
            type="email"
            data-testid="email-input"
            placeholder="Digite seu E-Mail"
          />
        </label>
        <label htmlFor="input-password">
          <input
            value={ password }
            onChange={ this.onChange }
            name="password"
            id="input-password"
            type="password"
            data-testid="password-input"
            placeholder="Digite sua Senha"
          />
        </label>
        <button
          type="button"
          disabled={ !isFormValid }
          onClick={ this.onSubmit }
        >
          Entrar
        </button>
      </div>
    );
  }
}

Login.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

function mapDispatchToProps(dispatch, props) {
  return {
    onSubmit: (credentials) => {
      dispatch({ type: 'USER_LOGIN', payload: credentials });
      props.history.push('/carteira');
    },
  };
}

export default connect(null, mapDispatchToProps)(Login);
