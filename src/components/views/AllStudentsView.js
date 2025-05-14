/*==================================================
AllStudentsView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display all students.
================================================== */
import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import { 
  Typography, 
  Button, 
  Card, 
  CardContent, 
  CardActions,
  Grid,
  Container,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Paper,
} from '@material-ui/core';
import { ArrowBack as ArrowBackIcon } from '@material-ui/icons';
import PropTypes from 'prop-types';

const DEFAULT_STUDENT_IMAGE = 'https://images.unsplash.com/photo-1544717305-2782549b5136?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80';

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
  deleteButton: {
    position: 'absolute',
    top: theme.spacing(1),
    right: theme.spacing(1),
    color: theme.palette.error.main,
  },
  addButton: {
    marginTop: theme.spacing(2),
  },
  divider: {
    margin: theme.spacing(3, 0),
  },
}));

const AllStudentsView = (props) => {
  const { allStudents, deleteStudent } = props;
  const classes = useStyles();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState(null);

  const handleDeleteClick = (student) => {
    setStudentToDelete(student);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (studentToDelete) {
      deleteStudent(studentToDelete.id);
      setDeleteDialogOpen(false);
      setStudentToDelete(null);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setStudentToDelete(null);
  };

  return (
    <Container className={classes.container}>
      <Paper className={classes.paper}>
        <div className={classes.header}>
          <Typography variant="h4" component="h1">
            All Students
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

        {allStudents.length === 0 ? (
          <Typography variant="h6" align="center">
            No students found. Add a new student to get started!
          </Typography>
        ) : (
          <Grid container spacing={3}>
            {allStudents.map((student) => (
              <Grid item key={student.id} xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                  <div className={classes.cardMedia} style={{ position: 'relative', width: '100%', height: 0, paddingTop: '56.25%' }}>
                    <img
                      src={student.imageUrl || DEFAULT_STUDENT_IMAGE}
                      alt={`${student.firstname} ${student.lastname}`}
                      style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', borderTopLeftRadius: '4px', borderTopRightRadius: '4px' }}
                      onError={e => { e.target.onerror = null; e.target.src = DEFAULT_STUDENT_IMAGE; }}
                    />
                  </div>
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {student.firstname} {student.lastname}
                    </Typography>
                    <Typography>
                      Email: {student.email}
                    </Typography>
                    {student.gpa && (
                      <Typography>
                        GPA: {student.gpa}
                      </Typography>
                    )}
                  </CardContent>
                  <CardActions>
                    <Button
                      component={Link}
                      to={`/student/${student.id}`}
                      size="small"
                      color="primary"
                    >
                      View Details
                    </Button>
                    <Button
                      component={Link}
                      to={`/editstudent/${student.id}`}
                      size="small"
                      color="primary"
                    >
                      Edit
                    </Button>
                    <Button
                      size="small"
                      color="secondary"
                      onClick={() => handleDeleteClick(student)}
                    >
                      Delete
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}

        <Divider className={classes.divider} />

        <Button
          component={Link}
          to="/newstudent"
          variant="contained"
          color="primary"
          fullWidth
          className={classes.addButton}
        >
          Add New Student
        </Button>
      </Paper>

      <Dialog
        open={deleteDialogOpen}
        onClose={handleDeleteCancel}
      >
        <DialogTitle>Delete Student</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete {studentToDelete?.firstname} {studentToDelete?.lastname}?
            This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteConfirm} color="secondary" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

AllStudentsView.propTypes = {
  allStudents: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      firstname: PropTypes.string.isRequired,
      lastname: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      gpa: PropTypes.number,
      imageUrl: PropTypes.string,
    })
  ).isRequired,
  deleteStudent: PropTypes.func.isRequired,
};

export default AllStudentsView;