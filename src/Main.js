import React, { useState} from "react";
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import App from "./App";
import Dashboard from "./Dashboard";
import About from "./About";
import InCourse from "./InCourse";
import CourseModule from "./CourseModule";
import TextModule from "./TextModule";
import VideoModule from "./VideoModule";
import QuizModule from "./QuizModule";
import ResetPassword from "./ResetPassword";


function Main() {
    const [userData, setUserData] = useState(localStorage.getItem("userData") || null);
    //console.log(userData);
    const [courseID, setCourseID] = useState(null);
    const [moduleID, setModuleID] = useState(null);
    return (
      <Router>
        <Routes>
            <Route path="/" element={<App setUserData={setUserData} />} />
            <Route path="/login" element={<App setUserData={setUserData} />} />
            <Route path="/resetpassword" element={<ResetPassword />} />
            <Route path="/dashboard" element={<Dashboard userData={userData} setCourseID={setCourseID}/>} />
            <Route path="dashboard/about" element={<About/>}/>
            <Route path="dashboard/incourse" element={courseID ? <InCourse userName={userData} courseID={courseID}/> : <App setUserData={setUserData}/>}/>
            <Route path="dashboard/coursemodule/" element={<CourseModule userName={userData} courseID={courseID} setModuleID={setModuleID}/>}/>
            <Route path="dashboard/coursemodule/textmodule" element={<TextModule id={moduleID} userName={userData} courseID={courseID}/>}/>
            <Route path="dashboard/coursemodule/videomodule" element={<VideoModule id={moduleID} userName={userData} courseID={courseID}/>}/>
            <Route path="dashboard/coursemodule/quizmodule" element={<QuizModule id={moduleID} userName={userData} courseID={courseID}/>}/>
        </Routes>
      </Router>
    );
}

export default Main;
  