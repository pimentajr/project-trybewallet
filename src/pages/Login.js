import React from 'react';
import PropTypes from 'prop-types';
import withStore from '../utils/withStore';
import Layout from '../component/Layout';
import { login as loginAgent } from '../agents';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      canLogin: false,
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value });
    this.validateFields();
  }

  handleSubmit(e) {
    e.preventDefault();
    const { history, login } = this.props;
    const { email } = this.state;

    login({ email });
    history.push('/wallet');
  }

  validateFields() {
    const { email, password } = this.state;
    const MIN_PASSWORD_LENGTH = 5;

    if (
      /(.*)@(.*)\.com/.test(email)
      && password.length >= MIN_PASSWORD_LENGTH
    ) {
      this.setState({ canLogin: true });
    } else {
      this.setState({ canLogin: false });
    }
  }

  render() {
    const { email, password, canLogin } = this.state;

    return (
      <Layout title="Login">
        <main>
          <form onSubmit={ this.handleSubmit }>
            <input
              type="email"
              name="email"
              data-testid="email-input"
              onChange={ this.handleInputChange }
              value={ email }
            />
            <input
              type="password"
              name="password"
              data-testid="password-input"
              onChange={ this.handleInputChange }
              value={ password }
            />
            <button type="submit" disabled={ !canLogin }>
              Entrar
            </button>
            {' '}
          </form>
        </main>
      </Layout>
    );
  }
}

Login.propTypes = {
  login: PropTypes.func,
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

export default withStore(Login, null, [loginAgent]);
