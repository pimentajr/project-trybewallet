import React from 'react';
import FormLogin from '../Components/FormLogin';
import Button from '../Components/Button';

class Login extends React.Component {
  render() {
    return (
      <div>
        <FormLogin />
        <Button />
      </div>
    );
  }
}

export default Login;

// Rendering "Form Login" and "Button" components to constitute the login homepage
