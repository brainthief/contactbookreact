import * as axios from "axios";

export const statuses = {
  NOT_INITIALIZED: "NOT_INITIALIZED",
  ERROR: "ERROR",
  INPROGRESS: "INPROGRESS",
  SUCCESS: "SUCCESS",
};

const UPDATE_SEARCH_NAME = "CB/SEARCH_FORM/UPDATE_MESSAGE";
const UPDATE_SEARCH_PHONE = "CB/SEARCH_FORM/UPDATE_PHONE";
const UPDATE_STATUS_INPROGRESS = "CB/TABLE/UPDATE_STATUS_INPROGRESS";
const UPDATE_STATUS_SUCCESS = "CB/TABLE/UPDATE_STATUS_SUCCESS";
const UPDATE_DATA = "CB/TABLE/UPDATE_DATA_FROM_AXIOS";
const DELETE_ROW = "CB/TABLE/DELETE_ROW"
const SELECT_EDIT = "CB/TABLE/SELECT_ON_CLICK"
const UPDATE_EDIT_NAME = "CB/TABLE/UPDATE_EDIT_NAME"
const UPDATE_EDIT_PHONE = "CB/TABLE/UPDATE_EDIT_PRONE"

const initialState = {
  status: statuses.NOT_INITIALIZED,
  data: [],
  dataForShow: [],
  searchName: "",
  searchPhone: "",
  editId: "",
  editName: "",
  editPhone: ""
};

export const updateSearchNameActionCreator = value => {
  return {
    type: UPDATE_SEARCH_NAME,
    value,
  };
};

export const updateSearchPhoneActionCreator = value => {
  return {
    type: UPDATE_SEARCH_PHONE,
    value,
  };
};

export const updateStatusInprogressActionCreator = () => {
  return {
    type: UPDATE_STATUS_INPROGRESS,
  };
};

export const updateStatusSuccessActionCreator = () => {
  return {
    type: UPDATE_STATUS_SUCCESS,
  };
};

export const updateDataActionCreator = value => {
  return {
    type: UPDATE_DATA,
    value,
  };
};

export const deleteActionCreator = id => {
  return {
    type: DELETE_ROW,
    id,
  };
};

export const selectRowActionCreator = (id, name, phone) => {
  return {
    type: SELECT_EDIT,
    id,
    name,
    phone
  };
};

export const updateEditNameActionCreator = value => {
  return {
    type: UPDATE_EDIT_NAME,
    value,
  };
};

export const updateEditPhoneActionCreator = value => {
  return {
    type: UPDATE_EDIT_PHONE,
    value,
  };
};

const tablePageReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_SEARCH_NAME:
      let newState = { ...state };
      newState.searchName = action.value;
      newState.dataForShow = newState.data.data;
      if (newState.searchName !== '') { newState.dataForShow = newState.dataForShow.filter(n => n.Name.toLowerCase().search(action.value.toLowerCase()) > -1) }
      if (newState.searchPhone !== '') { newState.dataForShow = newState.dataForShow.filter(n => n.Phone.search(newState.searchPhone) > -1) }
      return newState;
    case UPDATE_SEARCH_PHONE:
      let newStateP = { ...state };
      newStateP.searchPhone = action.value;
      newStateP.dataForShow = newStateP.data.data;
      if (newStateP.searchName !== '') { newStateP.dataForShow = newStateP.dataForShow.filter(n => n.Name.toLowerCase().search(newStateP.searchName.toLowerCase()) > -1) }
      if (newStateP.searchPhone !== '') { newStateP.dataForShow = newStateP.dataForShow.filter(n => n.Phone.search(newStateP.searchPhone) > -1) }
      return newStateP;
    case UPDATE_STATUS_INPROGRESS:
      let newStateS = { ...state };
      newStateS.status = statuses.INPROGRESS;
      return newStateS;
    case UPDATE_STATUS_SUCCESS:
      let newStateSu = { ...state };
      newStateSu.status = statuses.SUCCESS;
      return newStateSu;
    case UPDATE_DATA:
      let newStateSa = { ...state };
      newStateSa.data = action.value;
      newStateSa.dataForShow = newStateSa.data.data
      return newStateSa;
    case DELETE_ROW:
      fetch("http://localhost/vanilphp/api.php?action=del", {
        method: "POST",
        body: JSON.stringify({
          id: action.id
        })
      })
      let newStateDel = { ...state };
      newStateDel.data.data = newStateDel.data.data.filter(n => n.id !== action.id);
      newStateDel.dataForShow = newStateDel.data.data
      if (newStateDel.searchName !== '') { newStateDel.dataForShow = newStateDel.dataForShow.filter(n => n.Name.toLowerCase().search(newStateDel.searchName.toLowerCase()) > -1) }
      if (newStateDel.searchPhone !== '') { newStateDel.dataForShow = newStateDel.dataForShow.filter(n => n.Phone.search(newStateDel.searchPhone) > -1) }
      return newStateDel
    case SELECT_EDIT:
      let newStateSelect = { ...state };
      newStateSelect.editId = action.id
      newStateSelect.editName = action.name
      newStateSelect.editPhone = action.phone
      return newStateSelect
    case UPDATE_EDIT_NAME:
      let newStateEN = { ...state };
      newStateEN.editName = action.value;
      return newStateEN
    case UPDATE_EDIT_PHONE:
      let newStateEP = { ...state };
      newStateEP.editPhone = action.value;
      return newStateEP
    default:
      return state;
  }
};

export default tablePageReducer;
