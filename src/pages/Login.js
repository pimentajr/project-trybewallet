import React from 'react';
import Button from '../components/Button';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
    };
  }

  handleLoginBtn() {
    const { email, password } = this.state;
    const emailRegexp = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
    if (emailRegexp.test(email) && password === '123456') {
      return false;
    }
    return true;
  }

  handleInputText({ target }) {
    const { value, name } = target;
    this.setState({
      [name]: value,
    });
  }

  render() {
    const { email, password } = this.state;
    return (
      <div>
        <div>Image</div>
        <input
          data-testid="email-input"
          type="email"
          name="email"
          required
          onChange={ (e) => this.handleInputText(e) }
        />
        <input
          data-testid="password-input"
          type="password"
          minLength="6"
          name="password"
          required
          onChange={ (e) => this.handleInputText(e) }
        />
        <Button
          disabled={ this.handleLoginBtn() }
          email={ email }
          password={ password }
        />
      </div>
    );
  }
}

export default Login;
