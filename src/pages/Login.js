import React from 'react';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange({ target }) {
    const { name, value } = target;

    this.setState({
      [name]: value,
    });
  }

  render() {
    const { email, password } = this.state;
    const length = 6;

    const emailRegex = () => {
      const emailValid = /\S+@\S+\.\S+/;

      const emailCorrect = emailValid.test(email);
      return emailCorrect;
    };

    const passwordValid = password.length >= length;

    return (
      <div>
        <input
          name="email"
          type="email"
          data-testid="email-input"
          placeholder="Email"
          value={ email }
          onChange={ this.handleChange }

        />
        <input
          style={ { display: 'flex', marginTop: '10px' } }
          type="password"
          name="password"
          data-testid="password-input"
          placeholder="Senha"
          value={ password }
          onChange={ this.handleChange }

        />
        <button
          type="button"
          disabled={ !(emailRegex() && passwordValid) }
        >
          Entrar
        </button>
      </div>

    );
  }
}

export default Login;
