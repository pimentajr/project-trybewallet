import React from 'react';
import { useSelector } from 'react-redux';

export default function Header() {
  const emailField = useSelector((state) => state.user.email);

  return (
    <div data-testid="email-field">
      <div>{emailField}</div>
    </div>);
}
