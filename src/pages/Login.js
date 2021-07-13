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
    btnSubmit.disabled = !form.checkValidity();
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
              autoComplete="off"
              className="login-email"
              id="email"
              name="email"
              type="email"
              data-testid="email-input"
              required
              onChange={ (e) => this.setState({ email: e.target.value }) }
            />
          </label>
          <div>
            <label htmlFor="login">
              Senha
              <input
                type="password"
                data-testid="password-input"
                className="login-pass"
                id="login"
                pattern=".{6,}"
                required
              />
            </label>
          </div>
          <div>
            <Link to="/carteira">
              <button
                type="button"
                id="submit-btn"
                onClick={ dispatchEmail(email) } // se mudar para arrow para o erro mas quebra o teste
                disabled
              >
                Entrar
              </button>
            </Link>
          </div>
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
