import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class Moeda extends React.Component {
  componentDidMount() {
    const { fetchCoins } = this.props;
    fetchCoins();
  }

  render() {
    const { data, inputValue } = this.props;
    console.log('Eu sou o data', data);
    // console.log((data.map((coins) => Object.values(coins))));
    return (
      <label htmlFor="Moeda">
        Moeda
        <select
          id="Moeda"
          name="currency"
          onChange={ inputValue }
        >
          { (data && data.map((coins) => Object.values(coins)
            .map((siglasCoins) => siglasCoins)
            .filter((item) => item.codein !== 'BRLT')
            .map((option, index) => <option key={ index }>{option.code}</option>))) }
        </select>
      </label>
    );
  }
}

const mapStateToProps = (state) => ({
  data: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  fetchCoins: () => dispatch(actions.fetchCoins()),
});

Moeda.propTypes = {
  fetchCoins: PropTypes.func,
  data: PropTypes.shape,
  inputValue: PropTypes.string,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Moeda);

// Tive ajuda do parceiro Arthur Hermann
// Também me ajudou o parceiro Guilherme Pereira
