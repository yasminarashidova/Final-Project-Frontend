/*==================================================
NewStudentView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display the new student view page.
================================================== */
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Typography,
  Button,
  TextField,
  Container,
  Paper,
  Grid,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  CircularProgress,
} from '@material-ui/core';
import { ArrowBack as ArrowBackIcon } from '@material-ui/icons';
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
  form: {
    marginTop: theme.spacing(3),
  },
  formControl: {
    width: '100%',
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
}));

const NewStudentView = (props) => {
  const { allCampuses, addStudent, loading, error } = props;
  const classes = useStyles();

  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    gpa: '',
    campusId: '',
    imageUrl: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Convert GPA to number if it's not empty
    const studentData = {
      ...formData,
      gpa: formData.gpa ? parseFloat(formData.gpa) : null,
    };
    addStudent(studentData);
  };

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

  return (
    <Container className={classes.container}>
      <Paper className={classes.paper}>
        <div className={classes.header}>
          <Typography variant="h4" component="h1">
            Add New Student
          </Typography>
          <Button
            component={Link}
            to="/"
            variant="outlined"
            startIcon={<ArrowBackIcon />}
            className={classes.backButton}
          >
            Back to Home
          </Button>
        </div>

        <form onSubmit={handleSubmit} className={classes.form}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="First Name"
                name="firstname"
                value={formData.firstname}
                onChange={handleChange}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="Last Name"
                name="lastname"
                value={formData.lastname}
                onChange={handleChange}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="GPA"
                name="gpa"
                type="number"
                inputProps={{ step: "0.1", min: "0.0", max: "4.0" }}
                value={formData.gpa}
                onChange={handleChange}
                variant="outlined"
                helperText="Enter a GPA between 0.0 and 4.0"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel>Campus</InputLabel>
                <Select
                  name="campusId"
                  value={formData.campusId}
                  onChange={handleChange}
                  label="Campus"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {allCampuses && allCampuses.map((campus) => (
                    <MenuItem key={campus.id} value={campus.id}>
                      {campus.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Photo URL"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleChange}
                variant="outlined"
                placeholder="https://example.com/photo.jpg"
                helperText="Optional: Add a photo URL for the student"
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
              >
                Add Student
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

NewStudentView.propTypes = {
  allCampuses: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
  addStudent: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  error: PropTypes.string,
};

export default NewStudentView;