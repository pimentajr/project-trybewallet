import React, { Component } from 'react';
import { Card, Button, Container } from 'react-bootstrap';
// import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import LoginForm from './LoginForm';

class LoginCard extends Component {
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

const mapStateToProps = (state) => ({

});

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(LoginCard);
