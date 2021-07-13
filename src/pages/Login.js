import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { userLogin } from '../actions';

class Login extends React.Component {
  constructor(props) {
    super(props);

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
    const { userData } = this.props;

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
        <Link
          onClick={ () => (userData(email)) }
          to="/carteira"
        >
          <button
            type="button"
            disabled={ !(emailRegex() && passwordValid) }
          >
            Entrar
          </button>
        </Link>
      </div>

    );
  }
}

Login.propTypes = {
  userData: PropTypes.func,
}.isRequired;

const mapDispatchToProps = (dispatch) => ({
  userData: (email) => dispatch(userLogin(email)),
});

export default connect(null, mapDispatchToProps)(Login);
