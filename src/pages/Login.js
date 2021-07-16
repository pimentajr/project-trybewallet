import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import '../styles/Login.css';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faEnvelope, faKey } from '@fortawesome/free-solid-svg-icons';
import { emailAction } from '../actions';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
    this.changeValue = this.changeValue.bind(this);
    this.isValidEmail = this.isValidEmail.bind(this);
    this.isValidPassword = this.isValidPassword.bind(this);
    this.validation = this.validation.bind(this);
    this.submit = this.submit.bind(this);
  }

  componentDidMount() {
    this.validation();
  }

  changeValue({ target }) {
    const { sendEmail } = this.props;
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => {
      const { email } = this.state;
      this.validation();
      sendEmail(email);
    });
  }

  isValidEmail() {
    const regex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    const { email } = this.state;
    if (regex.test(email)) {
      return true;
    }
    return false;
  }

  isValidPassword() {
    const { password } = this.state;
    const SIX = 6;
    if (password.length >= SIX) {
      return true;
    }
    return false;
  }

  validation() {
    const submitBtn = document.querySelector('.sbmtBtn');
    const emailValid = this.isValidEmail();
    const passwordValid = this.isValidPassword();
    if (emailValid && passwordValid) {
      submitBtn.disabled = false;
      submitBtn.enabled = true;
    } else {
      submitBtn.disabled = true;
    }
  }

  submit() {
    const { history, sendEmail } = this.props;
    const { email } = this.state;
    sendEmail(email);
    history.push('carteira');
    this.setState({
      email: '',
      password: '',
    });
  }

  render() {
    const { email, password } = this.state;
    return (
      <div className="login">
        <form className="form">
          <h1 className="logTitle">login</h1>
          <div className="inputDiv">
            {/* <p><FontAwesomeIcon icon={ faEnvelope } /></p> */}
            <p>E</p>
            <input
              type="email"
              data-testid="email-input"
              name="email"
              placeholder="E-mail"
              onChange={ this.changeValue }
              value={ email }
              className="loginInput"
            />
          </div>
          <div className="inputDiv">
            {/* <p><FontAwesomeIcon icon={ faKey } /></p> */}
            <p>P</p>
            <input
              type="password"
              data-testid="password-input"
              name="password"
              placeholder="Passowrd"
              onChange={ this.changeValue }
              value={ password }
              className="loginInput"
            />
          </div>
          <button
            type="button"
            onClick={ this.submit }
            className="sbmtBtn"
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  sendEmail: (state) => dispatch(emailAction(state)),
});

Login.propTypes = {
  sendEmail: PropTypes.func.isRequired,
  history: PropTypes.objectOf(Object).isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
