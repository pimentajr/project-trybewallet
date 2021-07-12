import React from 'react';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { saveEmail } from '../actions';

// Regex http://jsfiddle.net/ghvj4gy9/
const username = '^(([^<>()[\\]\\.,;:\\s@"]+(\\.[^<>()[\\]\\.,;:\\s@"]+)*)|(".+"))';
const domainName = '@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}';
const domain = '\\.[0-9]{1,3}])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$';
const EMAIL_REGEX = new RegExp([username, domainName, domain].join(''));
const passLength = 6;

class LoginForm extends React.Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
      btnDisabled: false,
      redirect: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.condition = this.condition.bind(this);
    this.openButton = this.openButton.bind(this);
  }

  handleChange({ value, name }) {
    this.setState({
      [name]: value,
    }, () => this.setState({
      btnDisabled: this.openButton(),
    }));
  }

  openButton() {
    const { email, password } = this.state;

    return EMAIL_REGEX.test(email) && password.length >= passLength;
  }

  condition() {
    /* e.preventDefault(); */
    const { email } = this.state;
    const { emailInput } = this.props;
    this.setState({ redirect: true });
    emailInput(email);
  }

  render() {
    const { redirect } = this.state;

    if (redirect) {
      return <Redirect to="/carteira" />;
    }
    const { email, password, btnDisabled } = this.state;
    return (
      <form onSubmit={ this.condition }>
        <label htmlFor="email-input">
          Insira seu email:
          <input
            data-testid="email-input"
            name="email"
            value={ email }
            onChange={ ({ target }) => this.handleChange(target) }
            type="email"
          />
        </label>

        <br />
        <label htmlFor="password-input">
          Insira sua senha:
          <input
            data-testid="password-input"
            name="password"
            minLength="6"
            required
            value={ password }
            onChange={ ({ target }) => this.handleChange(target) }
            type="password"
          />
        </label>

        <button type="submit" disabled={ !btnDisabled }>Entrar</button>

      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  emailInput: (payload) => dispatch(saveEmail(payload)),
});

LoginForm.propTypes = {
  emailInput: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(LoginForm);

// Luiz Wendel me ajudou muito no requisito 2
