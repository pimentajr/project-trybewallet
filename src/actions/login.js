const login = ({ email }) => ({ type: 'LOGIN', payload: { email } });

export default login;
