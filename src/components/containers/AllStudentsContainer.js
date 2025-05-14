/*==================================================
AllStudentsContainer.js

The Container component is responsible for stateful logic and data fetching, and
passes data (if any) as props to the corresponding View component.
If needed, it also defines the component's "connect" function.
================================================== */
import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchAllStudentsThunk, deleteStudentThunk } from "../../store/thunks";
import { AllStudentsView } from "../views";

class AllStudentsContainer extends Component {
  // Get all students data from back-end database
  componentDidMount() {
    this.props.fetchAllStudents();
  }

  // Render All Students view by passing all students data as props to the corresponding View component
  render() {
    return (
      <div>
        <AllStudentsView 
          allStudents={this.props.allStudents}
          deleteStudent={this.props.deleteStudent}
        />
      </div>
    );
  }
}

// Map state to props
const mapState = (state) => {
  return {
    allStudents: state.student.allStudents,
  };
};

// Map dispatch to props
const mapDispatch = (dispatch) => {
  return {
    fetchAllStudents: () => dispatch(fetchAllStudentsThunk()),
    deleteStudent: (studentId) => dispatch(deleteStudentThunk(studentId)),
  };
};

// Export store-connected container by default
export default connect(mapState, mapDispatch)(AllStudentsContainer);