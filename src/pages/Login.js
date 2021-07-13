import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { sendInfo } from '../actions';
import LoginForm from '../components/LoginForm';

export default function Login() {
  const [login, setLogin] = useState({ email: '', password: '' });
  const dispatch = useDispatch();
  const history = useHistory();

  const handleChange = (element) => {
    const { target } = element;
    const { name, value } = target;
    setLogin({ ...login, [name]: value });
  };

  const handleSubmit = (element) => {
    element.preventDefault();
    console.log('teste');
    dispatch(sendInfo(login.email));
    history.push('/carteira');
  };

  const handleDisabled = () => {
    const emailValidation = new RegExp(
      /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$/,
    );
    const passwordValidation = 6;
    if (emailValidation.test(login.email)
     && login.password.length >= passwordValidation) {
      return false;
    }
    return true;
  };
  return (
    <LoginForm
      handleSubmit={ handleSubmit }
      handleChange={ handleChange }
      handleDisabled={ handleDisabled }
    />

  );
}
