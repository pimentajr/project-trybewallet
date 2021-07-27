/* eslint-disable no-alert */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { eraseDispense, AllowEditFormAction, editDispenseAction } from '../actions';
import TableBody from './TableBody';

class Table extends Component {
  constructor(props) {
    super(props);
    this.handleClickRemove = this.handleClickRemove.bind(this);
    this.handleClickEdit = this.handleClickEdit.bind(this);
  }

  handleClickRemove(index) {
    const { deletDispense } = this.props;
    deletDispense(index);
  }

  handleClickEdit(index) {
    const { editFormsTrue, infos, objectToEdit } = this.props;
    objectToEdit(infos[index]);
    editFormsTrue(true);
  }

  render() {
    const { infos = [] } = this.props;
    return (
      <table id="table">
        <thead className="thead">
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th colSpan="2">Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>
          {
            infos.map((item, index) => (
              <TableBody
                key={ index }
                index={ index }
                item={ item }
                handleClickRemove={ this.handleClickRemove }
                handleClickEdit={ () => this.handleClickEdit(index) }
              />
            ))
          }
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  infos: state.wallet.expenses,
  editableObject: state.wallet.editableObject,
});

const mapDispatchToProps = (dispatch) => ({
  deletDispense: (index) => dispatch(eraseDispense(index)),
  editFormsTrue: (boolean) => dispatch(AllowEditFormAction(boolean)),
  objectToEdit: (obj) => dispatch(editDispenseAction(obj)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Table);

Table.propTypes = {
  infos: PropTypes.arrayOf(PropTypes.object).isRequired,
  deletDispense: PropTypes.func.isRequired,
  editFormsTrue: PropTypes.func.isRequired,
  objectToEdit: PropTypes.func.isRequired,
};

// Source: auxílio do colega Douglas e consulta ao repositório do Marcos
