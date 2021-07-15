import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setUser } from '../actions';
import wallet from '../wallet.gif';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      disabled: true,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange({ value, name }) {
    this.setState({
      [name]: value,
    }, () => {
      const { email, password } = this.state;
      const reg = /\S+@\S+\.\S+/;
      const min = 6;
      this.setState({
        disabled: !(email.match(reg) && password.length >= min),
      });
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
            value={ password }
            onChange={ (e) => this.handleChange(e.target) }
          />
        </label>
      </form>
    );
  }

  renderSubmitButton() {
    const { email, disabled } = this.state;
    const { setUserAction } = this.props;
    return (
      <Link to="/carteira">
        <button
          type="button"
          disabled={ disabled }
          onClick={ () => setUserAction(email) }
        >
          Entrar
        </button>
      </Link>
    );
  }

  render() {
    return (
      <div className="loginContainer">
        <h3>TrybeWallet</h3>
        <img src={ wallet } alt="carteira" className="image" />
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
