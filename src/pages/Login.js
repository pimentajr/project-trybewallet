import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setUser } from '../actions';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange({ value, name }) {
    this.setState({
      [name]: value,
    });
  }

  renderEmailInput() {
    const { email } = this.state;
    return (
      <form>
        <label htmlFor="email-input">
          <input
            type="email"
            name="email"
            data-testid="email-input"
            placeholder="Email"
            value={ email }
            onChange={ (e) => this.handleChange(e.target) }
          />
        </label>
      </form>
    );
  }

  renderPasswordInput() {
    const { password } = this.state;
    return (
      <form>
        <label htmlFor="password-input">
          <input
            type="password"
            name="password"
            data-testid="password-input"
            placeholder="Senha"
            minLength="6"
            value={ password }
            onChange={ (e) => this.handleChange(e.target) }
          />
        </label>
      </form>
    );
  }

  renderSubmitButton() {
    const { email, password } = this.state;
    const { setUserAction } = this.props;
    return (
      <Link
        to="/carteira"
        className="button"
        onClick={ (e) => {
          if (!email && !password) {
            e.preventDefault();
          }
          setUserAction(email);
        } }
      >
        Entrar
      </Link>
    );
  }

  render() {
    return (
      <div className="loginContainer">
        <h3>TrybeWallet</h3>
        <div className="inputForm">
          {this.renderEmailInput()}
          {this.renderPasswordInput()}
        </div>
        {this.renderSubmitButton()}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  setUserAction: (state) => dispatch(setUser(state)),
});

Login.propTypes = {
  setUserAction: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
