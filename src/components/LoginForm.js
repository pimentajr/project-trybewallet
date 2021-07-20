import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as loginActions from '../actions/loginActions';

class LoginForm extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      btn: false,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  validate() {
    const { email, password } = this.state;
    const minPass = 6;
    if (email.includes('.com') && password.length >= minPass) {
      this.setState({
        btn: true,
      });
    }
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    },
    () => this.validate());
  }

  render() {
    const { email, btn } = this.state;
    const { addEmail } = this.props;
    return (
      <div>
        <h2>Login</h2>
        <input
          type="email"
          placeholder="Email"
          data-testid="email-input"
          name="email"
          onChange={ this.handleChange }
        />
        <input
          type="password"
          placeholder="Senha"
          data-testid="password-input"
          name="password"
          onChange={ this.handleChange }
        />
        <Link to="/carteira">
          <button
            type="button"
            disabled={ !btn }
            onClick={ () => addEmail(email) }
          >
            Entrar
          </button>
        </Link>
      </div>
    );
  }
}

LoginForm.propTypes = {
  addEmail: PropTypes.string,
}.isRequired;

const mapDispatchToProps = (dispatch) => ({
  addEmail: (email) => dispatch(loginActions.userLogin(email)),
});

export default connect(null, mapDispatchToProps)(LoginForm);
