/*==================================================
StudentContainer.js

The Container component is responsible for stateful logic and data fetching, and
passes data (if any) as props to the corresponding View component.
If needed, it also defines the component's "connect" function.
================================================== */
import { Component } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchStudentThunk } from '../../store/thunks';
import { StudentView } from '../views';

// Wrapper component to use hooks in class component
const StudentContainerWrapper = (props) => {
  const { id } = useParams();
  return <StudentContainer {...props} studentId={id} />;
};

class StudentContainer extends Component {
  componentDidMount() {
    // Getting student ID from props
    this.props.fetchStudent(this.props.studentId);
  }

  render() {
    return (
      <StudentView 
        student={this.props.student}
        loading={this.props.loading}
        error={this.props.error}
      />
    );
  }
}

// Map state to props
const mapState = (state) => {
  console.log('StudentContainer mapState:', state);
  return {
    student: state.student.student,
    loading: state.student.loading,
    error: state.student.error,
  };
};

// Map dispatch to props
const mapDispatch = (dispatch) => {
  return {
    fetchStudent: (id) => dispatch(fetchStudentThunk(id)),
  };
};

// Export store-connected container by default
export default connect(mapState, mapDispatch)(StudentContainerWrapper);