import React from 'react';

class Tag extends React.Component {
  constructor() {
    super();
    this.state = {
      tag: 'Alimentação',
    };

    this.handleChance = this.handleChance.bind(this);
  }

  handleChance({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  render() {
    const { tag } = this.state;
    return (
      <div>
        <label htmlFor="tag">
          Tag
          <select id="tag" name="tag" value={ tag } onChange={ this.handleChance }>
            <option>Alimentação</option>
            <option>Lazer</option>
            <option>Trabalho</option>
            <option>Transporte</option>
            <option>Saúde</option>
          </select>
        </label>
      </div>
    );
  }
}

export default Tag;
