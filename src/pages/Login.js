import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setEmail } from '../actions';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      testEmail: false,
      testPass: false,
    };
    this.handlePass = this.handlePass.bind(this);
    this.handleEmail = this.handleEmail.bind(this);
  }

  handlePass({ target: { value } }) {
    const number = 5;
    if (value.length < number) {
      this.setState({ testPass: true });
    }
    if (value.length >= number) {
      this.setState({ testPass: false });
    }
  }

  handleEmail({ target: { value } }) {
    this.setState({ email: value });
    // https://pt.stackoverflow.com/questions/1386/express%C3%A3o-regular-para-valida%C3%A7%C3%A3o-de-e-mail
    const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    if (reg.test(value)) {
      this.setState({ testEmail: false });
    } else {
      this.setState({ testEmail: true });
    }
  }

  render() {
    const { testEmail, testPass, email } = this.state;
    const { setEmailKey, history } = this.props;
    return (
      <div>
        <h1>Login</h1>
        <form>
          <input
            datatestid="email-input"
            onChange={ this.handleEmail }
            type="email"
          />
          <input
            datatestid="password-input"
            onChange={ this.handlePass }
            type="password"
          />
          <button
            type="button"
            onClick={ () => {
              setEmailKey(email);
              history.push('/carteira');
            } }
            disabled={ testPass || testEmail }
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  setEmailKey: (payload) => dispatch(setEmail(payload)),
});

export default connect(null, mapDispatchToProps)(Login);

Login.propTypes = ({
  setEmailKey: PropTypes.func.isRequired,
  history: PropTypes.shape({ push: PropTypes.func }).isRequired,
});
