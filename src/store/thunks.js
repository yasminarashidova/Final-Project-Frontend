/*==================================================
/src/store/thunks.js

It contains all Thunk Creators and Thunks.
================================================== */
import * as ac from './actions/actionCreators';  // Import Action Creators ("ac" keyword Action Creator)
import * as at from './actions/actionTypes';  // Import Action Types
const axios = require('axios');

//All Campuses
// THUNK CREATOR:
export const fetchAllCampusesThunk = () => async (dispatch) => {  // The THUNK
  try {
    // API "get" call to get "campuses" data from database
    let res = await axios.get(`/api/campuses`);  
    // Call Action Creator to return Action object (type + payload with "campuses" data)
    // Then dispatch the Action object to Reducer to update state 
    dispatch(ac.fetchAllCampuses(res.data));
  } catch(err) {
    console.error(err);
  }
};

// Single Campus
// THUNK CREATOR:
export const fetchCampusThunk = (id) => async (dispatch) => {
  try {
    console.log('Fetching campus with ID:', id);
    dispatch({ type: at.FETCH_CAMPUS });
    const response = await axios.get(`/api/campuses/${id}`);
    console.log('Campus data received:', response.data);
    
    // Transform the data to match the expected format
    const campusData = {
      ...response.data,
      students: response.data.students || []
    };
    
    dispatch({ type: at.FETCH_CAMPUS_SUCCESS, payload: campusData });
    return campusData;
  } catch (error) {
    console.error('Error fetching campus:', error);
    const errorMessage = error.response?.data?.message || error.message || 'Failed to fetch campus';
    dispatch({ type: at.FETCH_CAMPUS_ERROR, payload: errorMessage });
    throw error;
  }
};

// Add Campus
// THUNK CREATOR:
export const addCampusThunk = (campus) => async (dispatch) => {
  try {
    dispatch({ type: at.ADD_CAMPUS });
    const response = await axios.post('/api/campuses', campus);
    dispatch({ type: `${at.ADD_CAMPUS}_SUCCESS`, payload: response.data });
    // Navigate back to campuses list after successful addition
    window.location.href = '/campuses';
  } catch (error) {
    console.error('Error adding campus:', error);
    dispatch({ 
      type: `${at.ADD_CAMPUS}_ERROR`, 
      payload: error.response?.data?.message || 'Failed to add campus' 
    });
  }
};

// Delete Campus
// THUNK CREATOR:
export const deleteCampusThunk = campusId => async dispatch => {  // The THUNK
  try {
    // API "delete" call to delete campus (based on "campusId") from database
    await axios.delete(`/api/campuses/${campusId}`);  
    // Delete successful so change state with dispatch
    dispatch(ac.deleteCampus(campusId));
  } catch(err) {
    console.error(err);
    throw err;
  }
};

// Edit Campus
// THUNK CREATOR:
export const editCampusThunk = (campusId, campus) => async (dispatch) => {
  try {
    dispatch({ type: at.EDIT_CAMPUS });
    const response = await axios.put(`/api/campuses/${campusId}`, campus);
    dispatch({ type: `${at.EDIT_CAMPUS}_SUCCESS`, payload: response.data });
    // Navigate back to campuses list after successful edit
    window.location.href = '/campuses';
  } catch (error) {
    console.error('Error editing campus:', error);
    dispatch({ 
      type: `${at.EDIT_CAMPUS}_ERROR`, 
      payload: error.response?.data?.message || 'Failed to edit campus' 
    });
  }
};

// All Students
// THUNK CREATOR:
export const fetchAllStudentsThunk = () => async (dispatch) => {  // The THUNK
  try {
    // API "get" call to get "students" data from database
    let res = await axios.get(`/api/students`);  
    // Call Action Creator to return Action object (type + payload with "students" data)
    // Then dispatch the Action object to Reducer to update state 
    dispatch(ac.fetchAllStudents(res.data));  
  } catch(err) {
    console.error(err);
  }
};

// Add Student
// THUNK CREATOR:
export const addStudentThunk = (student) => async (dispatch) => {
  try {
    dispatch({ type: at.ADD_STUDENT });
    const response = await axios.post('/api/students', student);
    dispatch({ type: `${at.ADD_STUDENT}_SUCCESS`, payload: response.data });
    // Navigate back to students list after successful addition
    window.location.href = '/students';
  } catch (error) {
    console.error('Error adding student:', error);
    dispatch({ 
      type: `${at.ADD_STUDENT}_ERROR`, 
      payload: error.response?.data?.message || 'Failed to add student' 
    });
  }
};

// Delete Student
// THUNK CREATOR:
export const deleteStudentThunk = (studentId) => async (dispatch) => {
  try {
    dispatch({ type: at.DELETE_STUDENT });
    await axios.delete(`/api/students/${studentId}`);
    dispatch({ type: `${at.DELETE_STUDENT}_SUCCESS`, payload: studentId });
    // Navigate back to students list after successful deletion
    window.location.href = '/students';
  } catch (error) {
    console.error('Error deleting student:', error);
    dispatch({ 
      type: `${at.DELETE_STUDENT}_ERROR`, 
      payload: error.response?.data?.message || 'Failed to delete student' 
    });
  }
};

// Edit Student
// THUNK CREATOR:
export const editStudentThunk = (studentId, student) => async dispatch => {  // The THUNK
  try {
    // API "put" call to update student (based on "id" and "student" object's data) from database
    let updatedStudent = await axios.put(`/api/students/${studentId}`, student); 
    // Update successful so change state with dispatch
    dispatch(ac.editStudent(updatedStudent.data));
    return updatedStudent.data;
  } catch(err) {
    console.error(err);
    throw err;
  }
};

// Single Student
// THUNK CREATOR:
export const fetchStudentThunk = (id) => async (dispatch) => {
  try {
    dispatch({ type: at.FETCH_STUDENT });
    const response = await axios.get(`/api/students/${id}?include=campus`);
    console.log('Student data received:', response.data);
    dispatch({ type: `${at.FETCH_STUDENT}_SUCCESS`, payload: response.data });
  } catch (error) {
    console.error('Error fetching student:', error);
    dispatch({ 
      type: `${at.FETCH_STUDENT}_ERROR`, 
      payload: error.response?.data?.message || 'Failed to fetch student' 
    });
  }
};
