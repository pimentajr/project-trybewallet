import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setEmail } from '../actions';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      btnDisable: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.submitInputEmail2State = this.submitInputEmail2State.bind(this);
  }

  authenticate() {
    const { email, password } = this.state;
    const minLength = 5;
    this.setState({
      btnDisable: password.length >= minLength && email.includes('.com'),
    });
  }

  handleChange({ target: { name, value } }) {
    this.setState({
      [name]: value,
    }, this.authenticate());
  }

  submitInputEmail2State() {
    const { submitEmail, history: { push } } = this.props;
    const { email } = this.state;
    submitEmail(email);
    push('/carteira');
  }

  render() {
    const { btnDisable } = this.state;
    return (
      <div className="Login">
        <form className="formLogin">
          <label htmlFor="email" className="login-label">
            <input
              type="text"
              name="email"
              data-testid="email-input"
              id="email"
              placeholder="Email"
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="password" className="password-label">
            <input
              type="password"
              name="password"
              data-testid="password-input"
              placeholder="Senha"
              onChange={ this.handleChange }
            />
          </label>
          <button
            type="button"
            disabled={ !btnDisable }
            onClick={ this.submitInputEmail2State }
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  submitEmail: (email) => dispatch(setEmail(email)),
});

Login.propTypes = {
  submitEmail: PropTypes.func.isRequired,
  history: PropTypes.shape({
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
      search: PropTypes.string.isRequired,
      hash: PropTypes.string.isRequired,
    }),
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
