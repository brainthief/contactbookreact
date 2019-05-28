import React from "react";
import TableHeader from "./TableHeader/TableHeader";
import * as axios from "axios";
import { connect } from "react-redux";
import {
  statuses,
  updateStatusInprogressActionCreator,
  updateStatusSuccessActionCreator,
  updateDataActionCreator,
  deleteActionCreator,
  updateEditNameActionCreator,
  updateEditPhoneActionCreator,
  selectRowActionCreator
} from "./../../../../redux/tablePageRedux";

const TableContainer = props => {
  const { status, dataForShow, editId, editName, editPhone } = props.tablePage;
  const { setInprogress, setSuccess, setData, deleteRow, selectRow, updateEditName, updateEditPhone } = props;

  if (status === statuses.NOT_INITIALIZED) {
    setInprogress();
    axios.get("http://localhost/vanilphp/api.php").then(res => {
      setSuccess();
      setData(res.data);
    });
  }

  return (
    <div className="row mt-1">
      <div className="col-12">
        <table
          className="table table-striped table-bordered table-sm"
          cellSpacing="0"
          width="100%"
        >
          <TableHeader />
          {status === statuses.SUCCESS ? (
            <tbody>
              {typeof dataForShow !== "undefined"
                ? dataForShow.map(
                  (el, index) => index > 100
                    ? null
                    : <tr key={el.id}>
                      <th className="th-sm">{editId === el.id ? (<input
                        className="form-control"

                        type="text"
                        value={editName}
                        onChange={e => {
                          updateEditName(e);
                        }}
                      />) : el.Name}</th>
                      <th className="th-sm">{editId === el.id ? (<input
                        className="form-control"

                        type="number"
                        value={editPhone}
                        onChange={e => {
                          updateEditPhone(e);
                        }}
                      />) : el.Phone}</th>
                      <th className="th-sm"><i class="fas fa-sm fa-user-edit" onClick={() => selectRow(el.id, el.Name, el.Phone)} aria-hidden="true"></i> <i class="fas fa-user-alt-slash fa-sm" aria-hidden="true" onClick={() => deleteRow(el.id)}></i>
                      </th>
                    </tr>
                )
                : null}
              {/* {data.data.map(() => {
                return (

                  // <tr>
                  //   <th className="th-sm">Vardas ir pavardė</th>
                  //   <th className="th-sm">Telefono numeris</th>
                  //   <th className="th-sm">Veiksmai</th>
                  // </tr>
                );
              })} */}
            </tbody>
          ) : null}
        </table>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    tablePage: state.tablePage,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setInprogress: () => {
      dispatch(updateStatusInprogressActionCreator());
    },
    setSuccess: () => {
      dispatch(updateStatusSuccessActionCreator());
    },
    setData: val => {
      dispatch(updateDataActionCreator(val));
    },
    deleteRow: id => {
      dispatch(deleteActionCreator(id))
    },
    selectRow: (id, name, phone) => {
      dispatch(selectRowActionCreator(id, name, phone))
    },
    updateEditName: e => {
      dispatch(updateEditNameActionCreator(e.target.value))
    },
    updateEditPhone: e => {
      dispatch(updateEditPhoneActionCreator(e.target.value))
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TableContainer);
