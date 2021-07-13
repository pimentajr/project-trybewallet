import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class CurrentType extends React.Component {
  render() {
    const { currentType } = this.props;
    return (
      <>
        {Object.keys(currentType).map((type, index) => {
          if (type !== 'USDT') {
            return (
              <option key={ index }>
                { type }
              </option>);
          }
          return null;
        })}
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  currentType: state.wallet.currencies,
});

CurrentType.propTypes = {
  currentType: PropTypes.objectOf(PropTypes.object).isRequired,
};

export default connect(mapStateToProps)(CurrentType);
