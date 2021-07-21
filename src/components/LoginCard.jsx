import React, { Component } from 'react';
import { Card, Container } from 'react-bootstrap';
// import PropTypes from 'prop-types'
import LoginForm from './LoginForm';

export default class LoginCard extends Component {
  render() {
    return (
      <Container className="loginCardContainer">
        <Card
          style={ { width: '18rem' } }
          border="dark"
        >
          <Card.Img className="" variant="top" src="/login.png" />
          <Card.Body>
            <LoginForm />
          </Card.Body>
        </Card>
      </Container>

    );
  }
}
