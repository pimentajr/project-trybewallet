import React from 'react';
// import { Link } from 'react-router-dom';
// import { connect } from 'react-redux';
// // import PropTypes from 'prop-types';
// import { setEmail } from '../actions/index';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.isDisable = this.isDisable.bind(this);
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => this.isDisable());
  }

  validadeEmail(email) {
    const parseEmail = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/; // regex para validar email. url: https://pt.stackoverflow.com/questions/1386/express%C3%A3o-regular-para-valida%C3%A7%C3%A3o-de-e-mail
    return parseEmail.test(email); // RegExp.prototype.test() -> O método test() executa uma busca por uma correspondência entre  uma expressão regular e uma string. Retorna true ou false. url: https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/RegExp/test
  }

  validadePassword(password) {
    const minOfCaracteres = 6;
    return (password.length >= minOfCaracteres);
  }

  isDisable() {
    const { email, password } = this.state;
    const btnLogin = document.querySelectorAll('.btn-login')[0];
    if (this.validadeEmail(email) && this.validadePassword(password)) {
      btnLogin.disabled = false;
    } else {
      btnLogin.disabled = true;
    }
  }

  render() {
    const { email, password } = this.state;
    return (
      <div>
        <label htmlFor="email-id">
          Email:
          <input
            value={ email }
            id="email-id"
            name="email"
            type="email"
            data-testid="email-input"
            className="email"
            placeholder="Digite seu email"
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="password-id">
          Password:
          <input
            id="password-id"
            name="password"
            type="password"
            data-testid="password-input"
            className="password"
            value={ password }
            placeholder="Digite sua senha"
            onChange={ this.handleChange }
          />
        </label>
        {/* <Link to="/carteira"> */}
        <button type="submit" className="btn-login" disabled>
          Entrar
        </button>
        {/* </Link> */}
      </div>
    );
  }
}

// const mapStateToProps = (state) => ({
//   username: state.user.email,
// });

// const mapDispatchToProps = (dispatch) => ({
//   setEmailAction: (payload) => dispatch(setEmail(payload)),
// });

// export default connect(mapStateToProps, mapDispatchToProps)(Login);

export default Login;
