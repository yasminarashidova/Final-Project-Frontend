/*==================================================
EditStudentContainer.js

The Container component is responsible for stateful logic and data fetching, and
passes data and callbacks as props to child components.
================================================== */
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import EditStudentView from '../views/EditStudentView';
import { editStudentThunk, fetchStudentThunk, fetchAllCampusesThunk } from '../../store/thunks';

const EditStudentContainer = ({ editStudent, fetchStudent, fetchAllCampuses, student, allCampuses, loading, error }) => {
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (!id || id === 'undefined') return;
    fetchStudent(id);
    fetchAllCampuses();
  }, [fetchStudent, fetchAllCampuses, id]);

  const handleSubmit = async (studentId, student) => {
    if (!id || id === 'undefined') return;
    await editStudent(id, student);
    navigate('/students');
  };

  if (!id || id === 'undefined') return <div>Invalid student ID</div>;
  return (
    <EditStudentView
      student={student}
      allCampuses={allCampuses}
      loading={loading}
      error={error}
      editStudent={handleSubmit}
    />
  );
};

const mapState = (state) => ({
  student: state.student.student,
  allCampuses: state.campus.allCampuses || [],
  loading: state.student.loading,
  error: state.student.error,
});

const mapDispatch = (dispatch) => ({
  editStudent: (studentId, student) => dispatch(editStudentThunk(studentId, student)),
  fetchStudent: (studentId) => dispatch(fetchStudentThunk(studentId)),
  fetchAllCampuses: () => dispatch(fetchAllCampusesThunk()),
});

export default connect(mapState, mapDispatch)(EditStudentContainer); 