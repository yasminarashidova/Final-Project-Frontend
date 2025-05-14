/*==================================================
/src/store/reducers/student.js

It contains all Student Reducers. Student Reducers are required to send actions to do something.
================================================== */
import * as at from '../actions/actionTypes';

// REDUCER;
const studentReducer = (state = { allStudents: [], student: null, loading: false, error: null }, action) => {
  switch (action.type) {
    case at.FETCH_ALL_STUDENTS:
      return { ...state, allStudents: action.payload };
    case at.FETCH_STUDENT:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case `${at.FETCH_STUDENT}_SUCCESS`:
      return {
        ...state,
        student: action.payload,
        loading: false,
        error: null,
      };
    case `${at.FETCH_STUDENT}_ERROR`:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case at.ADD_STUDENT:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case `${at.ADD_STUDENT}_SUCCESS`:
      return {
        ...state,
        student: action.payload,
        loading: false,
        error: null,
      };
    case `${at.ADD_STUDENT}_ERROR`:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case at.DELETE_STUDENT:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case `${at.DELETE_STUDENT}_SUCCESS`:
      return {
        ...state,
        student: null,
        loading: false,
        error: null,
      };
    case `${at.DELETE_STUDENT}_ERROR`:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case at.EDIT_STUDENT:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case `${at.EDIT_STUDENT}_SUCCESS`:
      return {
        ...state,
        student: action.payload,
        loading: false,
        error: null,
      };
    case `${at.EDIT_STUDENT}_ERROR`:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default studentReducer;