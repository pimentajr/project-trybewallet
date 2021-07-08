import React, { Component } from 'react';
// import { useHistory } from 'react-router-dom';

class SingIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
    this.handleInput = this.handleInput.bind(this);
    // this.YourComponent = this.YourComponent.bind(this);
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

  // YourComponent() {
  //   const history = useHistory();
  //   history.push('/carteira');
  // }

  render() {
    const { email, password } = this.state;
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
          type="submit"
          disabled={ !this.disabled() }
          // onClick={ () => this.YourComponent() }
        >
          Entrar
        </button>
      </div>
    );
  }
}

export default SingIn;
