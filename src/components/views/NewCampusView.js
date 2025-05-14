import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  Paper,
  CircularProgress,
} from '@material-ui/core';
import { Save as SaveIcon, ArrowBack as ArrowBackIcon } from '@material-ui/icons';
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
  form: {
    width: '100%',
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
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
  errorMessage: {
    backgroundColor: theme.palette.error.main,
    color: theme.palette.error.contrastText,
    padding: theme.spacing(2),
    marginTop: theme.spacing(2),
    borderRadius: theme.shape.borderRadius,
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

const NewCampusView = ({ addCampus, loading, error }) => {
  const classes = useStyles();
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const campus = {
        name: name.trim(),
        address: address.trim(),
        description: description.trim(),
        imageUrl: imageUrl.trim() || 'https://via.placeholder.com/480x240?text=Campus',
      };
      await addCampus(campus);
    } catch (err) {
      console.error('Failed to add campus:', err);
    }
  };

  if (loading) {
    return (
      <div className={classes.loadingContainer}>
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return (
      <Container className={classes.container}>
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

  return (
    <Container className={classes.container}>
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
          <Typography variant="h4" component="h1">
            Add New Campus
          </Typography>
        </div>

        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Campus Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                variant="outlined"
                error={!name.trim()}
                helperText={!name.trim() ? 'Name is required' : ''}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                variant="outlined"
                error={!address.trim()}
                helperText={!address.trim() ? 'Address is required' : ''}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                variant="outlined"
                multiline
                rows={4}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Image URL"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                variant="outlined"
                placeholder="https://example.com/image.jpg"
                helperText="Leave empty to use default image"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            startIcon={<SaveIcon />}
            className={classes.submit}
            fullWidth
            disabled={!name.trim() || !address.trim()}
          >
            Add Campus
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

NewCampusView.propTypes = {
  addCampus: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  error: PropTypes.string,
};

export default NewCampusView; 