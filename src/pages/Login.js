import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { setUserEmail } from '../actions';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      disabled: true,
      login: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.checkEmail = this.checkEmail.bind(this);
    this.handleClkic = this.handleClkic.bind(this);
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    },
    () => {
      this.checkEmail();
    });
  }

  checkEmail() {
    // https://pt.stackoverflow.com/questions/1386/express%C3%A3o-regular-para-valida%C3%A7%C3%A3o-de-e-mail
    const { email, password } = this.state;
    const parseEmail = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
    const passwordLength = 6;
    const VALIDATE_EMAIL = parseEmail.test(email);
    const VALIDATE_PASSWORD = password.length >= passwordLength;
    if (VALIDATE_EMAIL && VALIDATE_PASSWORD) {
      this.setState({
        disabled: false,
      });
    }
  }

  handleClkic(param) {
    const { setUserEmailAction } = this.props;
    setUserEmailAction(param);
    this.setState({
      login: true,
    });
  }

  render() {
    const { email, disabled, password, login } = this.state;
    return (
      <>
        Login:
        <input
          type="text"
          placeholder="e-mail"
          name="email"
          value={ email }
          onChange={ this.handleChange }
          data-testid="email-input"
        />
        <input
          type="password"
          placeholder="senha"
          name="password"
          value={ password }
          onChange={ this.handleChange }
          data-testid="password-input"
        />
        <button
          type="submit"
          onClick={ () => this.handleClkic(email) }
          disabled={ disabled }
        >
          Entrar
        </button>
        {login ? <Redirect to="/carteira" /> : ''}
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  setUserEmailAction: (payload) => dispatch(setUserEmail(payload)),
});

export default connect(null, mapDispatchToProps)(Login);

Login.propTypes = {
  setUserEmailAction: PropTypes.func.isRequired,
};
