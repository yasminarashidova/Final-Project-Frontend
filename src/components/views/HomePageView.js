/*==================================================
HomePageView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display the home page.
================================================== */
import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { 
  Container, 
  Typography, 
  Button, 
  Grid, 
  Card, 
  CardContent,
  CardActions
} from '@material-ui/core';
import { School as SchoolIcon, Person as PersonIcon } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing(3),
  },
  cardContent: {
    flexGrow: 1,
    textAlign: 'center',
  },
  icon: {
    fontSize: 60,
    marginBottom: theme.spacing(2),
  },
  button: {
    marginTop: theme.spacing(2),
  },
}));

const HomePageView = () => {
  const classes = useStyles();

  return (
    <Container className={classes.container}>
      <Typography variant="h3" component="h1" gutterBottom align="center">
        Welcome to the Campus Management System
      </Typography>
      <Typography variant="h5" component="h2" gutterBottom align="center" color="textSecondary">
        Choose an option below to get started
      </Typography>
      
      <Grid container spacing={4} style={{ marginTop: '2rem' }}>
        <Grid item xs={12} sm={6}>
          <Card className={classes.card}>
            <SchoolIcon className={classes.icon} color="primary" />
            <CardContent className={classes.cardContent}>
              <Typography variant="h5" component="h2" gutterBottom>
                Campuses
              </Typography>
              <Typography variant="body1" color="textSecondary" paragraph>
                View and manage all campuses in the system
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                component={Link}
                to="/campuses"
                variant="contained"
                color="primary"
                className={classes.button}
              >
                View Campuses
              </Button>
            </CardActions>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Card className={classes.card}>
            <PersonIcon className={classes.icon} color="primary" />
            <CardContent className={classes.cardContent}>
              <Typography variant="h5" component="h2" gutterBottom>
                Students
              </Typography>
              <Typography variant="body1" color="textSecondary" paragraph>
                View and manage all students in the system
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                component={Link}
                to="/students"
                variant="contained"
                color="primary"
                className={classes.button}
              >
                View Students
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default HomePageView;