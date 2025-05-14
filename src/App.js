import "./App.css";

//Router
import { Routes, Route } from "react-router-dom";
//Components
import {
  HomePageContainer,
  CampusContainer,
  StudentContainer,
  AllCampusesContainer,
  AllStudentsContainer,
  NewStudentContainer,
  NewCampusContainer,
  EditCampusContainer,
  EditStudentContainer
} from './components/containers';

// if you create separate components for adding/editing 
// a student or campus, make sure you add routes to those
// components here

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePageContainer />} />
        <Route path="/campuses" element={<AllCampusesContainer />} />
        <Route path="/campus/:id" element={<CampusContainer />} />
        <Route path="/newcampus" element={<NewCampusContainer />} />
        <Route path="/campus/:id/edit" element={<EditCampusContainer />} />
        <Route path="/students" element={<AllStudentsContainer />} />
        <Route path="/newstudent" element={<NewStudentContainer />} />
        <Route path="/student/:id" element={<StudentContainer />} />
        <Route path="/editstudent/:id" element={<EditStudentContainer />} />
      </Routes>        
    </div>
  );
}

export default App;
