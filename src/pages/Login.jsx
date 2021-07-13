import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { setUser } from '../actions';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      isNotValid: true,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleVerify = this.handleVerify.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const { email } = this.state;
    const { history } = this.props;
    const { setUserAction } = this.props;
    setUserAction(email);

    history.push('/');
  }

  handleInputChange({ target: { name, value } }) {
    this.setState({ [name]: value });
    this.handleVerify();
  }

  handleVerify() {
    const { email, password } = this.state;
    const minimumPasswordLength = 5;
    const correctEmailEntry = /(.*)@(.*).com/;

    if (correctEmailEntry.test(email) && minimumPasswordLength <= password.length) {
      this.setState({ isNotValid: false });
      return;
    }

    this.setState({ isNotValid: true });
  }

  render() {
    const { email, password, isNotValid } = this.state;

    return (
      <div>
        <form onSubmit={ this.handleSubmit }>
          <input
            type="email"
            name="email"
            placeholder="email"
            data-testid="email-input"
            onChange={ this.handleInputChange }
            value={ email }
          />

          <input
            type="password"
            name="password"
            placeholder="password"
            data-testid="password-input"
            onChange={ this.handleInputChange }
            value={ password }
          />

          <input type="submit" value="Entrar" disabled={ isNotValid } />
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  setUserAction: (payload) => dispatch(setUser(payload)),
});

Login.propTypes = {
  setUserAction: PropTypes.func,
  history: PropTypes.object,
}.isRequired;

export default connect(null, mapDispatchToProps)(Login);
