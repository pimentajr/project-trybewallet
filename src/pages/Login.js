import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import { getEmail } from '../actions';
import rodolfo from '../image/rodolfo.png';
import filiCavalo from '../image/fili-cavalo.jpg';
import './styles/Login.css';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      password: '',
      email: '',
      disabled: true,
    };
    this.handleChange = this.handleChange.bind(this);
    this.validateState = this.validateState.bind(this);
  }

  componentDidUpdate() {
    this.validateState();
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  validateState() {
    const { password, email, disabled } = this.state;
    const regex = /^\w+(\w+)@\w+([-.]\w+).\w+([-.]\w+)*$/;
    const passwordMinLength = 6;
    if (regex.test(email) && password.length >= passwordMinLength && disabled) {
      this.setState({ disabled: false });
    } else if ((!regex.test(email) || password.length < passwordMinLength)
     && !disabled) {
      this.setState({ disabled: true });
    }
  }

  render() {
    const { password, email, disabled } = this.state;
    const { emailProps } = this.props;
    return (
      <div className="flex column main">
        {disabled
          ? <img src={ rodolfo } alt="rodolfão" className="img" />
          : <img src={ filiCavalo } alt="filiCavalo" className="img" />}
        <input
          type="text"
          name="email"
          data-testid="email-input"
          placeholder="Email"
          onChange={ this.handleChange }
          value={ email }
          className="input"
        />
        <input
          type="password"
          name="password"
          data-testid="password-input"
          placeholder="Senha"
          onChange={ this.handleChange }
          value={ password }
          className="input"
        />
        <Link to="/carteira">
          <button
            type="button"
            disabled={ disabled }
            onClick={ () => {
              emailProps(email);
            } }
            className="button"
          >
            Entrar
          </button>
        </Link>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  emailProps: (e) => dispatch(getEmail(e)),
});

Login.propTypes = {
  emailProps: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
