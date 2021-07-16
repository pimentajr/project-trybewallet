/* import React from 'react';

class FormLogin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange({ target: { name, value } }) {
    this.setState({
      [name]: value,
    });
  }

  validateMail() { // Req.2 - regex para habilitar ou desabilitar a tela inicial
    const { email, password } = this.state;
    const minCharacters = 6;
    const validate = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);
    if (validate && password.length >= minCharacters) {
      return true;
    } return false;
  }

  handleSubmit() {
    console.log('Teste');
  }

  render() {
    const { email, password } = this.state;
    return (
      <div>
        <form>
          <p>Login</p>
          <input
            data-testid="email-input"
            name="name"
            type="email"
            value={ email }
            placeholder="alguem@alguem.com"
            onChange={ (e) => this.handleChange(e) }
          />
          <input
            data-testid="password-input"
            name="password"
            type="password"
            value={ password }
            placeholder="Your password"
            onChange={ (e) => this.handleChange(e) }
          />
        </form>
      </div>
    );
  }
}

export default FormLogin;

// Form for the user to enter their email and password
 */
