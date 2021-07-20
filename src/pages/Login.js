import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { storeUserEmail } from '../actions';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      pass: '',
    };

    this.checkEmailAndPass = this.checkEmailAndPass.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  checkEmailAndPass(e, p) {
    const validEmail = /^[a-zA-Z]+@[a-zA-Z]+\.[com]{3,}$/i;
    const passLength = 6;
    return validEmail.test(e) && p.length >= passLength;
  }

  handleChange({ target: { name, value } }) {
    this.setState({
      [name]: value,
    });
  }

  render() {
    const { credentials } = this.props;
    const { email, pass } = this.state;
    return (
      <div>
        <label htmlFor="email-input">
          <input
            name="email"
            // value={ email }
            type="email"
            data-testid="email-input"
            required
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="password-input">
          <input
            name="pass"
            // value={ pass }
            type="password"
            data-testid="password-input"
            required
            onChange={ this.handleChange }
          />
        </label>
        <Link to="/carteira">
          <button
            type="button"
            disabled={ email && pass ? !(this.checkEmailAndPass(email, pass)) : true }
            onClick={ () => (credentials(email)) }
            // corrigindo onClick
          >
            Entrar
          </button>
        </Link>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  credentials: (state) => dispatch(storeUserEmail(state)),
});

export default connect(null, mapDispatchToProps)(Login);
