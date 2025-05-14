/*==================================================
AllCampusesView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display all campuses.
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
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing(3),
  },
  backButton: {
    marginRight: theme.spacing(2),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
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

const AllCampusesView = ({ allCampuses, loading, error, deleteCampus }) => {
  const classes = useStyles();

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
            to="/"
            variant="outlined"
            startIcon={<ArrowBackIcon />}
            className={classes.backButton}
          >
            Back to Home
          </Button>
        </Paper>
      </Container>
    );
  }

  return (
    <Container className={classes.root}>
      <div className={classes.header}>
        <Button
          component={Link}
          to="/"
          variant="outlined"
          startIcon={<ArrowBackIcon />}
          className={classes.backButton}
        >
          Back to Home
        </Button>
        <Button
          component={Link}
          to="/newcampus"
          variant="contained"
          color="primary"
        >
          Add New Campus
        </Button>
      </div>

      <Typography variant="h4" gutterBottom>
        All Campuses
      </Typography>

      {allCampuses && allCampuses.length > 0 ? (
        <Grid container spacing={3}>
          {allCampuses.map((campus) => (
            <Grid item key={campus.id} xs={12} sm={6} md={4}>
              <Card className={classes.card}>
                <div className={classes.cardMedia} style={{ position: 'relative', width: '100%', height: 0, paddingTop: '56.25%' }}>
                  <img
                    src={campus.imageUrl || DEFAULT_CAMPUS_IMAGE}
                    alt={campus.name}
                    style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', borderTopLeftRadius: '4px', borderTopRightRadius: '4px' }}
                    onError={e => { e.target.onerror = null; e.target.src = DEFAULT_CAMPUS_IMAGE; }}
                  />
                </div>
                <CardContent className={classes.cardContent}>
                  <Typography gutterBottom variant="h5" component="h2">
                    {campus.name}
                  </Typography>
                  <Typography>
                    {campus.address}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    color="primary"
                    component={Link}
                    to={`/campus/${campus.id}`}
                  >
                    View Details
                  </Button>
                  {campus.id && (
                    <Button
                      size="small"
                      color="primary"
                      component={Link}
                      to={`/campus/${campus.id}/edit`}
                    >
                      Edit
                    </Button>
                  )}
                  <Button
                    size="small"
                    color="secondary"
                    onClick={() => deleteCampus(campus.id)}
                  >
                    Delete
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Paper className={classes.paper}>
          <Typography variant="body1">No campuses found.</Typography>
        </Paper>
      )}
    </Container>
  );
};

AllCampusesView.propTypes = {
  allCampuses: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      address: PropTypes.string.isRequired,
      description: PropTypes.string,
      imageUrl: PropTypes.string,
    })
  ),
  loading: PropTypes.bool,
  error: PropTypes.string,
  deleteCampus: PropTypes.func,
};

export default AllCampusesView;