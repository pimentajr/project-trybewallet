import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { emailToState } from '../actions/index';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      status: true,
    };
    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleChangePW = this.handleChangePW.bind(this);
    this.validateLoginEntries = this.validateLoginEntries.bind(this);
  }

  // requisito 02
  handleChangeEmail({ target }) {
    const { value } = target;
    this.setState({
      email: value,
    }, () => this.validateLoginEntries());
  }

  // requisito 02
  handleChangePW({ target }) {
    const { value } = target;
    this.setState({
      password: value,
    }, () => this.validateLoginEntries());
  }

  // requisito 02
  validateLoginEntries() {
    const { email, password } = this.state;
    const numberOfCharacters = 6;
    const regex = /\w+@\w+.com(.br)?/;
    if (email !== '' && regex.test(email) && password.length >= numberOfCharacters) {
      this.setState({ status: false });
    } else {
      this.setState({ status: true });
    }
  }

  render() {
    const { status, email, password } = this.state;
    const { dispatchEmailToState } = this.props;
    return (
      <div>
        {/* requisito 01 */}
        <input
          type="email"
          data-testid="email-input"
          placeholder="E-mail"
          onChange={ this.handleChangeEmail }
          value={ email }
        />
        {/* requisito 01 */}
        <input
          type="password"
          data-testid="password-input"
          placeholder="Password"
          onChange={ this.handleChangePW }
          value={ password }
        />
        {/* requisito 01 */}
        {/* requisito 03 */}
        <Link to="/carteira">
          <button
            type="button"
            disabled={ status }
            onClick={ () => dispatchEmailToState(email) }
          >
            Entrar
          </button>
        </Link>
      </div>
    );
  }
}

// requisito 03
const mapDispatchToProps = (dispatch) => ({
  dispatchEmailToState: (email) => dispatch(emailToState(email)),
});

Login.propTypes = ({
  dispatchEmailToState: PropTypes.func,
}).isRequired;

export default connect(null, mapDispatchToProps)(Login);
