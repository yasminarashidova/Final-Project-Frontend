/*==================================================
CampusView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display a single campus view page.
================================================== */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Typography,
  Button,
  Container,
  Paper,
  Grid,
  CircularProgress,
  Card,
  CardContent,
  CardMedia,
  CardActions,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import { ArrowBack as ArrowBackIcon } from '@material-ui/icons';
import PropTypes from 'prop-types';

const DEFAULT_CAMPUS_IMAGE = 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  paper: {
    padding: theme.spacing(3),
    marginBottom: theme.spacing(3),
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
  imageContainer: {
    position: 'relative',
    height: 300,
    backgroundColor: '#f5f5f5',
    marginBottom: theme.spacing(3),
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  studentCard: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  studentCardMedia: {
    height: 140,
  },
  studentCardContent: {
    flexGrow: 1,
  },
  loadingContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 400,
  },
  errorContainer: {
    padding: theme.spacing(3),
    backgroundColor: theme.palette.error.light,
    color: theme.palette.error.contrastText,
    borderRadius: theme.shape.borderRadius,
    marginBottom: theme.spacing(3),
  },
}));

const CampusView = ({ campus, loading, error }) => {
  const classes = useStyles();

  console.log('CampusView received props:', { campus, loading, error });

  if (loading) {
    return (
      <div className={classes.loadingContainer}>
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return (
      <Container className={classes.root}>
        <Paper className={classes.errorContainer}>
          <Typography variant="h6">Error: {error}</Typography>
          <Button
            component={Link}
            to="/campuses"
            variant="outlined"
            startIcon={<ArrowBackIcon />}
            className={classes.backButton}
          >
            Back to Campuses
          </Button>
        </Paper>
      </Container>
    );
  }

  if (!campus) {
    console.log('No campus data available');
    return (
      <Container className={classes.root}>
        <Paper className={classes.paper}>
          <Typography variant="h5">Campus not found</Typography>
          <Button
            component={Link}
            to="/campuses"
            variant="outlined"
            startIcon={<ArrowBackIcon />}
            className={classes.backButton}
          >
            Back to Campuses
          </Button>
        </Paper>
      </Container>
    );
  }

  console.log('Rendering campus:', campus);

  return (
    <Container className={classes.root}>
      <Paper className={classes.paper}>
        <div className={classes.header}>
          <Button
            component={Link}
            to="/campuses"
            variant="outlined"
            startIcon={<ArrowBackIcon />}
            className={classes.backButton}
          >
            Back to Campuses
          </Button>
          <Button
            component={Link}
            to={`/campus/${campus.id}/edit`}
            variant="contained"
            color="primary"
          >
            Edit Campus
          </Button>
        </div>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <div className={classes.imageContainer}>
              <img
                src={campus.imageUrl || DEFAULT_CAMPUS_IMAGE}
                alt={campus.name}
                className={classes.image}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = DEFAULT_CAMPUS_IMAGE;
                }}
              />
            </div>
            <Typography variant="h4" gutterBottom>
              {campus.name}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              {campus.address}
            </Typography>
            <Typography variant="body1" paragraph>
              {campus.description}
            </Typography>
          </Grid>
        </Grid>
      </Paper>

      <Typography variant="h5" gutterBottom>
        Enrolled Students
      </Typography>

      {campus.students && campus.students.length > 0 ? (
        <Grid container spacing={3}>
          {campus.students.map((student) => (
            <Grid item xs={12} sm={6} md={4} key={student.id}>
              <Card className={classes.studentCard}>
                <CardMedia
                  className={classes.studentCardMedia}
                  image={student.imageUrl || DEFAULT_CAMPUS_IMAGE}
                  title={student.firstname + ' ' + student.lastname}
                />
                <CardContent className={classes.studentCardContent}>
                  <Typography gutterBottom variant="h6">
                    {student.firstname} {student.lastname}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Email: {student.email}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    GPA: {student.gpa}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    color="primary"
                    component={Link}
                    to={`/student/${student.id}`}
                  >
                    View Details
                  </Button>
                  <Button
                    size="small"
                    color="primary"
                    component={Link}
                    to={`/editstudent/${student.id}`}
                  >
                    Edit
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Paper className={classes.paper}>
          <Typography variant="body1">No students enrolled in this campus.</Typography>
        </Paper>
      )}
    </Container>
  );
};

CampusView.propTypes = {
  campus: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    description: PropTypes.string,
    imageUrl: PropTypes.string,
    students: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        firstname: PropTypes.string.isRequired,
        lastname: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
        gpa: PropTypes.number,
        imageUrl: PropTypes.string,
      })
    ),
  }),
  loading: PropTypes.bool,
  error: PropTypes.string,
};

export default CampusView;

export default CampusView;
