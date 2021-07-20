import React from 'react';
import '../App.css';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setUsername,
  setUserPass,
} from '../actions';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      senha: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.validateEmail = this.validateEmail.bind(this);
    this.validatePass = this.validatePass.bind(this);
    this.redirect = this.redirect.bind(this);
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState(() => ({ [name]: value }));
  }

  validateEmail(email) {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  }

  validatePass(senha) {
    const number = 6;
    if (senha.length >= number) {
      return true;
    }
    return false;
  }

  validButton() {
    const { email, senha } = this.state;
    const validEmail = this.validateEmail(email);
    const validPass = this.validatePass(senha);
    if (validEmail && validPass) {
      return false;
    }
    return true;
  }

  redirect() {
    const { setStateUser, history } = this.props;
    const { email, senha } = this.state;
    setStateUser(email);
    setUserPass(senha);
    history.push('/carteira');
  }

  render() {
    const buttoState = this.validButton();

    return (
      <div className="box-login">
        <label htmlFor="email">
          Usuário:
          <input
            name="email"
            type="text"
            data-testid="email-input"
            id="email"
            onChange={ this.handleChange }
          />
        </label>
        <br />
        <label htmlFor="Senha">
          Senha:
          <input
            type="password"
            data-testid="password-input"
            id="Senha"
            name="senha"
            onChange={ this.handleChange }
          />
        </label>
        <br />
        <button
          type="button"
          disabled={ buttoState }
          onClick={ () => this.redirect() }
        >
          Entrar
        </button>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  setStateUser: (payload) => dispatch(setUsername(payload)),
  setUserPass: (payload) => dispatch(setUserPass(payload)),
});

export default connect(null, mapDispatchToProps)(Login);

Login.propTypes = {
  setUserPass: PropTypes.func,
}.isRequired;
