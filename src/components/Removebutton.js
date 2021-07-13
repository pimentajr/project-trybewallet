import React, { Component } from 'react';

class Removebutton extends Component {
  render() {
    return (
      <button
        type="button"
        data-testid="delete-btn"
      >
        Excluir
      </button>
    );
  }
}

export default Removebutton;
