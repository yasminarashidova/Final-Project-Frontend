/*==================================================
NewStudentContainer.js

The Container component is responsible for stateful logic and data fetching, and
passes data and callbacks as props to child components.
================================================== */
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import NewStudentView from '../views/NewStudentView';
import { addStudentThunk, fetchAllCampusesThunk } from '../../store/thunks';

const NewStudentContainer = ({ addStudent, fetchAllCampuses, allCampuses, loading, error }) => {
  const navigate = useNavigate();

  useEffect(() => {
    fetchAllCampuses();
  }, [fetchAllCampuses]);

  console.log('All campuses in NewStudentContainer:', allCampuses);

  const handleSubmit = async (student) => {
    await addStudent(student);
    navigate('/students');
  };

  return (
    <NewStudentView
      allCampuses={allCampuses || []}
      addStudent={handleSubmit}
      loading={loading}
      error={error}
    />
  );
};

const mapState = (state) => ({
  allCampuses: state.campus.allCampuses,
  loading: state.campus.loading,
  error: state.campus.error,
});

const mapDispatch = (dispatch) => ({
  addStudent: (student) => dispatch(addStudentThunk(student)),
  fetchAllCampuses: () => dispatch(fetchAllCampusesThunk()),
});

export default connect(mapState, mapDispatch)(NewStudentContainer);