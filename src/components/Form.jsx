import PropTypes from 'prop-types';
import React, { Component } from 'react';

import Value from './Value';
import Description from './Description';
import Currencies from './Currencies';
import Payment from './Payment';
import Tag from './Tag';

class Form extends Component {
  render() {
    const { currencies } = this.props;
    return (
      <form>
        <Value />
        <Description />
        <Currencies currencies={ currencies } />
        <Payment />
        <Tag />
      </form>
    );
  }
}

Form.propTypes = {
  currencies: PropTypes.string.isRequired,
};

export default Form;
