import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { useDispatch } from 'react-redux';
import { setForm } from '../actions';
import Form from '../components/Form';

function Login() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [inputForm, setInputForm] = useState({
    email: '',
    password: '',
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(setForm(inputForm.email));
    setInputForm({ email: '', password: '' });
    history.push({
      pathname: '/carteira',
    });
  };
  const handleChange = ({ target: { value, name } }) => {
    setInputForm({
      ...inputForm,
      [name]: value,
    });
    const form = document.querySelector('.login-form');
    const buttonSubmit = document.querySelector('.submit-button');
    buttonSubmit.disabled = !form.checkValidity();
  };
  return (
    <Form
      handleChange={ handleChange }
      handleSubmit={ handleSubmit }
      inputForm={ inputForm }
    />
  );
}

export default Login;
