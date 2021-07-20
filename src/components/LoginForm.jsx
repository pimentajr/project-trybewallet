import React, { Component } from 'react';
import { Card, Form, Button, Container } from 'react-bootstrap';
// import PropTypes from 'prop-types'
import { connect } from 'react-redux';

class LoginForm extends Component {
  render() {
    return (
      <Container>
        <Card style={ { width: '18rem' } }>
          <Card.Img variant="top" src="holder.js/100px180" />
          <Card.Body>

            <Form.Group>
              <Form.Control
                data-testid="email-input"
                type="email"
                placeholder="Entre com seu email"
              />
              <Form.Text class="text-muted">example@example.com</Form.Text>
            </Form.Group>

            <Form.Group>
              <Form.Control
                data-testid="password-input"
                type="password"
                placeholder="Senha"
              />
              <Form.Text class="text-muted">Sua senha, por favor!</Form.Text>
            </Form.Group>

            <Button variant="success">Entrar</Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
