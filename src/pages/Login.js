import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginUserWallet } from '../actions';

const characters = {
  email: /^([a-z\d.-]+)@([a-z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/,
  password: /^[\w@-]{6,20}$/,
};

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      disabled: true,
    };
    this.handleInput = this.handleInput.bind(this);
  }

  validadeLogin() {
    const { email, password } = this.state;
    return characters.email.test(email) && characters.password.test(password);
  }

  handleInput(target) {
    const { value, name } = target;
    this.setState({
      [name]: value,
    }, () => this.setState({ disabled: !this.validadeLogin() }));
  }

  handleButton() {
    const { submitButton, history } = this.props;
    const { email } = this.state;
    submitButton(email);
    history.push('/carteira');
  }

  render() {
    const { disabled } = this.state;

    return (
      <form>
        <label htmlFor="email">
          E-mail
          <input
            data-testid="email-input"
            type="text"
            name="email"
            onChange={ ({ target }) => this.handleInput(target) }
            placeholder="Digite seu email"
          />
        </label>

        <label htmlFor="password">
          Senha
          <input
            data-testid="password-input"
            type="password"
            name="password"
            minLength="6"
            onChange={ ({ target }) => this.handleInput(target) }
            placeholder="Digite sua senha"
          />
        </label>

        <button
          type="button"
          onClick={ () => this.handleButton() }
          disabled={ disabled }
        >
          Entrar
        </button>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  submitButton: (value) => dispatch(loginUserWallet(value)),
});

Login.propTypes = {
  submitButton: PropTypes.func.isRequired,
  history: PropTypes.objectOf(PropTypes.object).isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
