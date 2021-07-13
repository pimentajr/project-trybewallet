import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router';
import { newUser } from '../actions';

class SingIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      shouldRedirect: null,
    };
    this.handleInput = this.handleInput.bind(this);
    this.logIn = this.logIn.bind(this);
    this.disabled = this.disabled.bind(this);
  }

  handleInput(event) {
    const { value, name } = event.target;
    this.setState({ [name]: value });
  }

  disabled() {
    const { email, password } = this.state;
    const minLength = 6;
    // Expressao regular para validação de Email.
    // LINK: https://stackoverflow.com/questions/4964691/super-simple-email-validation-with-javascript
    const emailFormat = /^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,15}$/;
    return (emailFormat.test(email) && password.length >= minLength);
  }

  logIn(e) {
    const { email } = this.state;
    e.preventDefault();
    const { user } = this.props;
    user(email);
    this.setState({ shouldRedirect: true });
  }

  render() {
    const { email, password, shouldRedirect } = this.state;
    if (shouldRedirect) {
      return <Redirect to="/carteira" />;
    }
    return (
      <div>
        <input
          data-testid="email-input"
          placeholder="Email"
          type="email"
          name="email"
          value={ email }
          onChange={ (e) => this.handleInput(e) }
        />
        <input
          data-testid="password-input"
          placeholder="Password"
          type="text"
          minLength="6"
          name="password"
          value={ password }
          onChange={ (e) => this.handleInput(e) }
        />
        <button
          type="button"
          disabled={ !this.disabled() }
          onClick={ (e) => this.logIn(e) }
        >
          Entrar
        </button>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  user: (state) => dispatch(newUser(state)) });

export default connect(null, mapDispatchToProps)(SingIn);

SingIn.propTypes = {
  user: PropTypes.func,
}.isRequered;
