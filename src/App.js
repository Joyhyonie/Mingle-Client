import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from './layouts/Layout';
import Main from './pages/main/Main';
import Mypage from "./pages/employee/Mypage";
import Organization from "./pages/employee/Organization";
import AppliedCertidocs from "./pages/certiDoc/AppliedCertidocs";
import ApplyCertiDoc from "./pages/certiDoc/ApplyCertiDoc";
import MyCertiDoc from "./pages/certiDoc/MyCertiDoc";
import BoardList from "./pages/board/BoardList";
import EmployeeAttendance from "./pages/attendance/EmployeeAttendance";
import AppliedLeaveList from "./pages/attendance/AppliedLeaveList";
import SubjectList from "./pages/lecture/admin/SubjectList";
import StudentAttendanceForAdmin from "./pages/lecture/admin/StudentAttendanceForAdmin";
import RegistLectureForAdmin from "./pages/lecture/admin/RegistLectureForAdmin";
import EmployeeManagement from "./pages/academic/EmployeeManagement";
import StudentManagement from "./pages/academic/StudentManagement";
import AcademicSchedule from "./pages/schedule/AcademicSchedule";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ <Layout/> }>
          <Route index element={ <Main/> }/>
          <Route path="mypage" element={ <Mypage/> }/>

          <Route path="board" element={ <BoardList/> }/>

          <Route path="organization" element={ <Organization/> }/>

          <Route path="certi-doc-applied" element={ <AppliedCertidocs/> }/>
          <Route path="certi-doc-apply" element={ <ApplyCertiDoc/> }/>
          <Route path="certi-doc-mine" element={ <MyCertiDoc/> }/>

          <Route path="attendance-employee" element={ <EmployeeAttendance/> }/>
          <Route path="leave-doc-applied" element={ <AppliedLeaveList/> }/>

          <Route path="subject" element={ <SubjectList/> }/>

          <Route path="lecture-student-admin" element={ <StudentAttendanceForAdmin/> }/>
          <Route path="lecture-regist-admin" element={ <RegistLectureForAdmin/> }/>

          <Route path="management-employee" element={ <EmployeeManagement/> }/>
          <Route path="management-student" element={ <StudentManagement/> }/>

          <Route path="schedule-academic" element={ <AcademicSchedule/> }/>
          
        </Route>
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
