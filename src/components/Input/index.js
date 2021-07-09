import React from 'react';

export default class Input extends React.Component {
  render() {
    const { ...attributes } = this.props;
    const { id, onChange } = attributes;

    return (
      <input
        name={ id }
        { ...attributes }
        onChange={ ({ target }) => onChange(target) }
      />
    );
  }
}
