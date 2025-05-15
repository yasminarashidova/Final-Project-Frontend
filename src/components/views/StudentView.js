/*==================================================
StudentView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display the single student view page.
================================================== */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Container,
  Typography,
  Paper,
  Grid,
  Button,
  CircularProgress,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(3),
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing(3),
  },
  backButton: {
    marginRight: theme.spacing(2),
  },
  loading: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '200px',
  },
  error: {
    color: theme.palette.error.main,
    textAlign: 'center',
    padding: theme.spacing(2),
  },
  editButton: {
    marginRight: theme.spacing(2),
  },
}));

const StudentView = (props) => {
  const { student, loading, error } = props;
  const classes = useStyles();

  console.log('StudentView props:', { student, loading, error });
  console.log('Student campus data:', student?.campus);

  if (loading) {
    return (
      <Container className={classes.container}>
        <div className={classes.loading}>
          <CircularProgress />
        </div>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className={classes.container}>
        <Typography className={classes.error}>
          Error: {error}
        </Typography>
      </Container>
    );
  }

  if (!student) {
    return (
      <Container className={classes.container}>
        <Typography className={classes.error}>
          Student not found
        </Typography>
      </Container>
    );
  }

  return (
    <Container className={classes.container}>
      <Paper className={classes.paper}>
        <div className={classes.header}>
          <Typography variant="h4" component="h1">
            {student.firstname} {student.lastname}
          </Typography>
          <div>
            <Button
              component={Link}
              to={`/editstudent/${student.id}`}
              variant="contained"
              color="primary"
              className={classes.editButton}
            >
              Edit Student
            </Button>
            <Button
              component={Link}
              to="/students"
              variant="outlined"
              className={classes.backButton}
            >
              Back to Students
            </Button>
          </div>
        </div>

        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Campus: {student.campus ? student.campus.name : 'Not enrolled'}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1" gutterBottom>
              Email: {student.email}
            </Typography>
          </Grid>
          {student.gpa && (
            <Grid item xs={12}>
              <Typography variant="body1" gutterBottom>
                GPA: {student.gpa}
              </Typography>
            </Grid>
          )}
        </Grid>
      </Paper>
    </Container>
  );
};

StudentView.propTypes = {
  student: PropTypes.shape({
    id: PropTypes.number.isRequired,
    firstname: PropTypes.string.isRequired,
    lastname: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    gpa: PropTypes.number,
    campus: PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
    }),
  }),
  loading: PropTypes.bool,
  error: PropTypes.string,
};

export default StudentView;
