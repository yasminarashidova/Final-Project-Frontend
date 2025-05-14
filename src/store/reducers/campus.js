/*==================================================
/src/store/reducers/campus.js

It contains all Campus Reducers. Campus Reducers are required to send actions to do something.
================================================== */
import * as at from '../actions/actionTypes';

// Initial state
const initialState = {
  allCampuses: [],
  singleCampus: null,
  loading: false,
  error: null,
};

// Reducer
const campusReducer = (state = initialState, action) => {
  console.log('Campus reducer received action:', action);
  console.log('Current state:', state);
  
  switch (action.type) {
    case at.FETCH_ALL_CAMPUSES:
      return {
        ...state,
        allCampuses: action.payload,
      };
    case at.FETCH_CAMPUS:
      console.log('Setting loading state for campus fetch');
      return {
        ...state,
        loading: true,
        error: null,
        singleCampus: null,
      };
    case at.FETCH_CAMPUS_SUCCESS:
      console.log('Setting campus data:', action.payload);
      return {
        ...state,
        singleCampus: action.payload,
        loading: false,
        error: null,
      };
    case at.FETCH_CAMPUS_ERROR:
      console.log('Setting error state:', action.payload);
      return {
        ...state,
        loading: false,
        error: action.payload,
        singleCampus: null,
      };
    case at.ADD_CAMPUS:
      return {
        ...state,
        allCampuses: [...state.allCampuses, action.payload],
      };
    case at.DELETE_CAMPUS:
      return {
        ...state,
        allCampuses: state.allCampuses.filter(campus => campus.id !== action.payload),
        singleCampus: state.singleCampus?.id === action.payload ? null : state.singleCampus,
      };
    case at.EDIT_CAMPUS:
      return {
        ...state,
        allCampuses: state.allCampuses.map(campus =>
          campus.id === action.payload.id ? action.payload : campus
        ),
        singleCampus: action.payload,
      };
    default:
      return state;
  }
};

export default campusReducer;