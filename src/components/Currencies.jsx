import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Currencies extends Component {
  render() {
    const { currencies } = this.props;
    return (
      <label htmlFor="currencies">
        Moeda:
        <select id="currencies">
          {
            currencies.map((item, i) => (
              <option key={ i } value={ item }>
                {item}
              </option>
            ))
          }
        </select>
      </label>
    );
  }
}

Currencies.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Currencies;
