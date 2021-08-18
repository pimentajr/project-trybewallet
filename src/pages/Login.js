import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { sendEmail } from '../actions';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      login: false,
    };
    this.validaLogin = this.validaLogin.bind(this);
    this.updateEmail = this.updateEmail.bind(this);
  }

  validaLogin({ target: { value } }) {
    const lengthPassword = 6;
    const validaEmail = /\S+@\S+\.\S+/;
    const { email } = this.state;
    if (value.length >= lengthPassword && validaEmail.test(email)) {
      this.setState({ login: true });
    }
  }

  updateEmail({ target: { value } }) {
    this.setState({ email: value });
  }

  render() {
    const { login, email } = this.state;
    const { emailProps } = this.props;
    console.log(email);
    return (
      <div>
        <label htmlFor="email">
          E-mail:
          {' '}
          <input
            data-testid="email-input"
            placeholder="Insira seu e-mail"
            id="email"
            type="email"
            onChange={ this.updateEmail }
          />
        </label>
        <label htmlFor="password">
          Senha:
          {' '}
          <input
            data-testid="password-input"
            placeholder="Insira sua senha"
            id="password"
            type="password"
            onChange={ this.validaLogin }
          />
        </label>
        <Link to="/carteira">
          <button
            type="button"
            disabled={ !login }
            onClick={ () => emailProps(email) }
          >
            {' '}
            Entrar
            {' '}

          </button>
        </Link>

      </div>
    );
  }
}

Login.propTypes = {
  emailProps: PropTypes.func,
};

Login.defaultProps = {
  emailProps: '',
};

const mapDispatchToProps = (dispatch) => ({
  emailProps: (state) => dispatch(sendEmail(state)) });

export default connect(null, mapDispatchToProps)(Login);
