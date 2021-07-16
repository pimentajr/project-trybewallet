import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getLogin } from '../actions';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      disabled: true,
    };

    this.handleChange = this.handleChange.bind(this);
    this.validateEmailAndPassword = this.validateEmailAndPassword.bind(this);
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  validateEmailAndPassword() {
    const { email, password } = this.state;
    const regex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
    const regexValidation = regex.test(email);
    const validPassword = password.length;
    const minLenght = 6;
    if (validPassword >= minLenght && regexValidation) {
      this.setState({ disabled: false });
    } else { this.setState({ disabled: true }); }
  } // peguei parte desta função com o Túlio Sploradori - Turma 11

  render() {
    const { dispatchLogin } = this.props;
    const { email, password, disabled } = this.state;

    return (
      <div>
        <form>
          <input
            type="text"
            name="email"
            id="email-input"
            data-testid="email-input"
            placeholder="email"
            onChange={ this.handleChange }
            value={ email }
            onKeyUp={ this.validateEmailAndPassword }
          />

          <input
            type="password"
            name="password"
            id="password-input"
            data-testid="password-input"
            placeholder="senha"
            onChange={ this.handleChange }
            value={ password }
            onKeyUp={ this.validateEmailAndPassword }
          />

          <Link to="/carteira">
            <button
              type="button"
              disabled={ disabled }
              onClick={ () => dispatchLogin(email) }
            >
              Entrar
            </button>
          </Link>
        </form>
      </div>);
  }
}

Login.propTypes = {
  dispatchLogin: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  dispatchLogin: (email) => dispatch(getLogin(email)),
});

export default connect(null, mapDispatchToProps)(Login);
// requisito 2 meus colegas do grupo 21 do projeto Trivia me ajudaram muito
// mesmo que indiretamente
