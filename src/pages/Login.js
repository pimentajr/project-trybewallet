import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { userLoginAction } from '../actions/index';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };

    this.handleChangeInput = this.handleChangeInput.bind(this);
    this.checkLogin = this.checkLogin.bind(this);
  }

  componentDidUpdate() {
    this.checkLogin();
  }

  /* fonte passada para validação do email https://www.horadecodar.com.br/2020/09/07/expressao-regular-para-validar-e-mail-javascript-regex/ */
  checkLogin() {
    const { email, password } = this.state;
    const re = /\S+@\S+\.\S+/;
    const magicNumber = 6;
    if (re.test(email) && password.length >= magicNumber) {
      return false;
    }
    return true;
  }

  handleChangeInput({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  render() {
    const { email, password } = this.state;
    const { validateLogin } = this.props;
    return (
      <div>
        <h2>TrybeWallet</h2>
        <input
          data-testid="email-input"
          type="email"
          placeholder="Informe seu email"
          name="email"
          value={ email }
          onChange={ this.handleChangeInput }
        />
        <input
          data-testid="password-input"
          type="password"
          placeholder="Informe sua senha"
          name="password"
          value={ password }
          onChange={ this.handleChangeInput }
        />
        <Link to="/carteira">
          <button
            type="button"
            disabled={ this.checkLogin() }
            onClick={ () => validateLogin(email) }
          >
            Entrar
          </button>
        </Link>
      </div>
    );
  }
}

// recebendo evento que será disparado pela action.
// recebe parametro e consegue ver o state | mapeia todo state para props
const mapDispatchToProps = (dispatch) => ({
  validateLogin: (email) => dispatch(userLoginAction(email)),
});

export default connect(null, mapDispatchToProps)(Login);

Login.propTypes = {
  validateLogin: PropTypes.func,
}.isRequired;
