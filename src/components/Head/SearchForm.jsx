import React from "react";
import {
  updateSearchNameActionCreator,
  updateSearchPhoneActionCreator,
} from "./../../redux/tablePageRedux";
import { connect } from "react-redux";

const SearchForm = props => {
  const { searchName, searchPhone } = props.tablePage;
  const { updateSearchName, updateSearchPhone } = props;
  return (
    <div className="form-row">
      <div className="col-xl-3 col-sm-6 col-12 pt-2 pl-3">
        <input
          className="form-control"
          type="text"
          placeholder="Vardo ar pavardės fragmentas"
          value={searchName}
          onChange={e => {
            updateSearchName(e);
          }}
        />
      </div>
      <div className="col-xl-1 col-sm-1 col-2 pt-3 text-right">
        <span>+370</span>
      </div>
      <div className="col-xl-3 col-sm-5 col-10 pt-2 pr-3">
        <input
          className="form-control"
          id="searchNumber"
          type="number"
          placeholder="Telefono 
        fragmentas"
          name="number"
          value={searchPhone}
          onChange={e => {
            updateSearchPhone(e);
          }}
        />
      </div>
      <div className="col-xl-5 col-sm-12">
        <input
          type="submit"
          value="Ieškoti"
          className="btn btn-primary"
          disabled
        />
        <button className="btn btn-primary">Atšaukti</button>
        <button className="btn btn-success">
          <i className="fas fa-user-plus" aria-hidden="true" />
        </button>
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
    updateSearchName: e => {
      dispatch(updateSearchNameActionCreator(e.target.value));
    },
    updateSearchPhone: e => {
      dispatch(updateSearchPhoneActionCreator(e.target.value));
    },
  };
};

const ConnectedSearchForm = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SearchForm);

export default ConnectedSearchForm;
