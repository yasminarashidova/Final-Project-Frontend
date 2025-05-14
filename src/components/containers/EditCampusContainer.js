import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { EditCampusView } from '../views';
import { fetchCampusThunk, editCampusThunk } from '../../store/thunks';

const EditCampusContainer = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { singleCampus, loading, error } = useSelector((state) => state.campus);

  useEffect(() => {
    if (!id || id === 'undefined') return;
    dispatch(fetchCampusThunk(id));
  }, [dispatch, id]);

  const handleSubmit = async (campusData) => {
    try {
      await dispatch(editCampusThunk(id, campusData));
      navigate(`/campus/${id}`);
    } catch (error) {
      console.error('Error updating campus:', error);
      throw error;
    }
  };

  if (!id || id === 'undefined') return <div>Invalid campus ID</div>;
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!singleCampus) return <div>Campus not found</div>;

  return <EditCampusView campus={singleCampus} editCampus={handleSubmit} />;
};

export default EditCampusContainer; 