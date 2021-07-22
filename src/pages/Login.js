import React from 'react';
import Footer from '../components/Footer';
import SingIn from '../components/SingIn';

class Login extends React.Component {
  render() {
    return (
      <div className="login-master">
        <SingIn />
        <Footer />
      </div>
    );
  }
}

export default Login;
