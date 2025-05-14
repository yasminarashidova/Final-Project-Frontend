/*==================================================
CampusContainer.js

The Container component is responsible for stateful logic and data fetching, and
passes data and callbacks as props to child components.
================================================== */
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import CampusView from '../views/CampusView';
import { fetchCampusThunk } from '../../store/thunks';

const CampusContainer = ({ fetchCampus, campus, loading, error }) => {
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      console.log('Fetching campus with ID:', id);
      fetchCampus(id);
    }
  }, [fetchCampus, id]);

  console.log('CampusContainer state:', { campus, loading, error });

  return (
    <CampusView
      campus={campus}
      loading={loading}
      error={error}
    />
  );
};

// Map state to props
const mapState = (state) => {
  console.log('Redux state:', state);
  return {
    campus: state.campus.singleCampus,
    loading: state.campus.loading,
    error: state.campus.error,
  };
};

// Map dispatch to props
const mapDispatch = (dispatch) => {
  return {
    fetchCampus: (id) => dispatch(fetchCampusThunk(id)),
  };
};

export default connect(mapState, mapDispatch)(CampusContainer);