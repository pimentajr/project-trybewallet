import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// Tive ajuda do Hugo, Bruno e Marlon
class WalletCurr extends React.Component {
  render() {
    const { curr } = this.props;
    return (
      <>
        {curr.map((itens, index) => {
          if (itens.codein !== 'BRLT') {
            return (
              <option key={ index }>
                { itens.code }
              </option>);
          }
          return null;
        })}
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  curr: state.wallet.currencies,
});

export default connect(mapStateToProps)(WalletCurr);

WalletCurr.propTypes = {
  curr: PropTypes.arrayOf.isRequired,
};
