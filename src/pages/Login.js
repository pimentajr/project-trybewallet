import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { userEmail } from '../actions';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      email: '', // starts empty
    };

    // bind buttons
    this.btnState = this.btnState.bind(this);
  }

  // Buttons
  btnState() {
    const form = document.getElementById('login-form');
    const btnSubmit = document.getElementById('submit-btn');
    btnSubmit.disable = !form.checkValidity();
  }

  // Render forms
  render() {
    const { dispatchEmail } = this.props;
    const { email } = this.state;

    return (
      <div>
        <form id="login-form" onChange={ this.btnState }>
          <label htmlFor="email">
            Login
            <input
              name="email"
              type="email"
              data-testid="email-input"
              className="login-email"
              id="email"
              required
              onChange={ (e) => this.setState({ email: e.target.value }) }
            />
          </label>
          <label htmlFor="pass">
            Senha
            <input
              type="password"
              data-testid="password-input"
              className="login-pass"
              id="pass"
              pattern=".{6,}" // Input Pattern: https://www.w3schools.com/tags/att_input_pattern.asp
              required
            />
          </label>
          <Link to="/carteira">
            <button
              type="button"
              id="submit-btn"
              onClick={ dispatchEmail(email) }
              disabled
            >
              Entrar
            </button>
          </Link>
        </form>
      </div>
    );
  }
}

// Dispatch
const mapDispatchToProps = (dispatch) => ({
  dispatchEmail: (email) => dispatch(userEmail(email)),
});

// Reference: https://react-redux.js.org/using-react-redux/connect-mapdispatch
export default connect(null, mapDispatchToProps)(Login);

// Props Validation
Login.propTypes = {
  dispatchEmail: PropTypes.func.isRequired,
};
