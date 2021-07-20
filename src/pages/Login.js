import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { userLogin } from '../actions';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
    };
    this.validateLogin = this.validateLogin.bind(this);
    this.handleEmail = this.handleEmail.bind(this);
  }

  validateLogin() {
    
  }

  handleEmail() {

  }

  render() {
    const { ... } = this.state;
    const { ... } = this.props;
    return (
      <div>
        <h1>Login</h1>
        <label >
          E-mail
          <input
            ...
          />
        </label>
        <label >
          Senha
          <input
            ...
          />
        </label>
        <Link >
          <button >
            Entrar
          </button>
        </Link>
      </div>
    );
  }
}


export default (Login);
