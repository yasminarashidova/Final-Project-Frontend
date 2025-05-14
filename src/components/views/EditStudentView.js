import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  TextField,
  Button,
  Typography,
  Container,
  MenuItem,
  Paper,
  Grid,
  FormControl,
  InputLabel,
  Select,
  CircularProgress,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
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

const EditStudentView = (props) => {
  const { student, allCampuses, loading, error, editStudent } = props;
  const classes = useStyles();
  const navigate = useNavigate();
  const { studentId } = useParams();
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    imageUrl: '',
    gpa: '',
    campusId: ''
  });

  useEffect(() => {
    if (student) {
      setFormData({
        firstname: student.firstname || '',
        lastname: student.lastname || '',
        email: student.email || '',
        imageUrl: student.imageUrl || '',
        gpa: student.gpa || '',
        campusId: student.campusId || ''
      });
    }
  }, [student]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstname.trim()) newErrors.firstname = 'First name is required';
    if (!formData.lastname.trim()) newErrors.lastname = 'Last name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (formData.gpa && (isNaN(formData.gpa) || formData.gpa < 0 || formData.gpa > 4.0)) {
      newErrors.gpa = 'GPA must be between 0.0 and 4.0';
    }
    if (formData.imageUrl && !formData.imageUrl.match(/^https?:\/\/.+/)) {
      newErrors.imageUrl = 'Please enter a valid URL';
    }
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const studentData = {
      ...formData,
      gpa: formData.gpa ? parseFloat(formData.gpa) : null,
    };
    editStudent(student.id, studentData);
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
            Edit Student
          </Typography>
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
                  {allCampuses.map((campus) => (
                    <MenuItem key={campus.id} value={campus.id}>
                      {campus.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
              >
                Save Changes
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

EditStudentView.propTypes = {
  student: PropTypes.shape({
    id: PropTypes.number.isRequired,
    firstname: PropTypes.string.isRequired,
    lastname: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    gpa: PropTypes.number,
    campusId: PropTypes.number,
  }),
  allCampuses: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
  loading: PropTypes.bool,
  error: PropTypes.string,
  editStudent: PropTypes.func.isRequired,
};

export default EditStudentView; 