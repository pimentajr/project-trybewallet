import React, { Component } from 'react';

class Category extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tag: '',
    };
    this.handleTest = this.handleTest.bind(this);
  }

  handleTest(e) {
    this.setState({
      tag: e.target.value,
    });
  }

  render() {
    const { tag } = this.state;
    return (
      <div>
        <label htmlFor="Category">
          Tag:
          <select
            id="Category"
            value={ tag }
            onClick={ this.handleTest }
          >
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
        </label>
      </div>
    );
  }
}

export default Category;
