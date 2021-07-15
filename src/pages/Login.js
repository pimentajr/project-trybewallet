import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { requestLogin } from '../actions';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
    this.handleUserName = this.handleUserName.bind(this);
    this.ableDisable = this.ableDisable.bind(this);
  }

  handleUserName({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  ableDisable() {
    const { email, password } = this.state;
    const userConfig = /[a-z0-9._-]+@[a-z0-9]+\.[a-z]+$/;
    const passwordConfig = 6;
    return userConfig.test(email) && password.length >= passwordConfig;
  }

  render() {
    const ableOrDisable = this.ableDisable();
    const { email } = this.state;
    console.log(email);
    const { isLoggedIn } = this.props;
    return (
      <div>
        <h1>Login</h1>
        <form>
          <label htmlFor="email-input">
            Usuário:
            <input
              type="email"
              data-testid="email-input"
              name="email"
              onChange={ this.handleUserName }
            />
          </label>

          <label htmlFor="password-input">
            Senha:
            <input
              type="password"
              data-testid="password-input"
              name="password"
              onChange={ this.handleUserName }
            />
          </label>

          <Link to="/carteira">
            <button
              type="submit"
              disabled={ !ableOrDisable }
              onClick={ () => isLoggedIn(email) }
            >
              Entrar
            </button>
          </Link>
        </form>
      </div>
    );
  }
}

Login.propTypes = ({
  isLoggedIn: PropTypes.func,
}).isRequired;

const mapDispatchToProps = (dispatch) => ({
  isLoggedIn: (email) => dispatch(requestLogin(email)),
});

export default connect(null, mapDispatchToProps)(Login);
