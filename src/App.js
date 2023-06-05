import { Toaster } from 'react-hot-toast';
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Layout from './layouts/Layout';
import Mypage from "./pages/employee/Mypage";
import Organization from "./pages/employee/Organization";
import AppliedCertidocs from "./pages/certiDoc/AppliedCertidocs";
import ApplyCertiDoc from "./pages/certiDoc/ApplyCertiDoc";
import MyCertiDoc from "./pages/certiDoc/MyCertiDoc";
import BoardMain from "./pages/board/BoardMain";
import EmployeeAttendance from "./pages/attendance/EmployeeAttendance";
import AppliedLeaveList from "./pages/attendance/AppliedLeaveList";
import SubjectList from "./pages/lecture/admin/SubjectList";
import StudentAttendanceForAdmin from "./pages/lecture/admin/StudentAttendanceForAdmin";
import RegistLectureForAdmin from "./pages/lecture/admin/RegistLectureForAdmin";
import EmployeeManagement from "./pages/academic/EmployeeManagement";
import StudentManagement from "./pages/academic/StudentManagement";
import AcademicSchedule from "./pages/schedule/AcademicSchedule";
import RegistLectureForProf from "./pages/lecture/professor/RegistLectureForProf";
import StudentAttendanceForProf from "./pages/lecture/professor/StudentAttendanceForProf";
import MainPageLayout from "./layouts/MainPageLayout";
import MyCalendar from "./components/main/MyCalendar";
import AcademicCalendar from "./components/main/AcademicCalendar";
import BoardDetail from './pages/board/BoardDetail';
import BoardRegist from './pages/board/BoardRegist';
import BoardModify from './pages/board/BoardModify';
import BoardLayout from './layouts/BoardLayout';
import ProtectedRoute from "./components/router/ProtectedRoute";
import Login from './pages/login/Login';
import IdSearch from './pages/login/IdSearch';
import PwdSearch from './pages/login/PwdSearch';
import MyPageLayout from './layouts/MypageLayout';
import PwdChange from './pages/login/Pwdchange';

import AttendanceDetail from './components/items/AttendanceEmployeeDetail';
import StudentModify from './pages/academic/StudentModify';
import StudentRegist from './pages/academic/StudentRegist';
import EmployeeModify from './pages/academic/EmployeeModify';
import EmployeeRegist from './pages/academic/EmployeeRegist';
import EmployeeDetail from './pages/academic/EmployeeModify';
import MyLeave from './components/lists/MyLeaveDoc';
import AttendanceDetailList from './components/lists/AttendanceDetailList';
import Error from './pages/error/Error';
import AttendanceEmployeeDetail from './components/items/AttendanceEmployeeDetail';


function App() {
  return (
    <>
      <Toaster
        reverseOrder={false}
        toastOptions={{
          duration: 3000,
          style: {
            border: '2px solid #66D2B3',
            padding: '20px',
            color: '#343434',
            fontWeight: 'bold'
          },
        }}
      />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ProtectedRoute loginCheck={true}><Layout /></ProtectedRoute>}
          >
            <Route element={<MainPageLayout />}>
              <Route index element={<MyCalendar />} />
              <Route element={<AcademicCalendar />} />
            </Route>
            {/* <MainPageLayout/>의 Route */}
            <Route path="board" element={<BoardLayout />}>
              <Route index element={<Navigate to="/board/main" replace />} />
              <Route path="main" element={<BoardMain />} />
              <Route path="search" element={<BoardMain />} />
              <Route path=":boardCode" element={<BoardDetail />} />
              <Route path=":boardCode/modify" element={<BoardModify />} />
              <Route path="regist" element={<BoardRegist />} />
            </Route>
            {/* <BoardLayout/>의 Route */}
            <Route path="mypage" element={<MyPageLayout />}>
              <Route index element={<Navigate to="/mypage/profile" replace />} />
              <Route path="profile" element={<ProtectedRoute loginCheck={true}><Mypage /></ProtectedRoute>} />
            </Route>
            {/* <MyPageLayout/>의 Route */}
            <Route path="pwdchange" element={<ProtectedRoute loginCheck={true}><PwdChange /></ProtectedRoute>} />
            <Route path='MyLeave' element={<ProtectedRoute loginCheck={true}><MyLeave /></ProtectedRoute>}>
              <Route path='search' element={<MyLeave />} />
            </Route>
            <Route path="organization" element={<Organization />} />

            <Route path="certi-doc-applied" element={<ProtectedRoute adminCheck={true}><AppliedCertidocs /></ProtectedRoute>}>
              <Route path='search' element={<AppliedCertidocs />} />
            </Route>
            <Route path="certi-doc-apply" element={<ApplyCertiDoc />} />
            <Route path="certi-doc-mine" element={<MyCertiDoc />}>
              <Route path='search' element={<MyCertiDoc />} />
            </Route>

            <Route path="attendance-employee" element={<ProtectedRoute adminCheck={true}><EmployeeAttendance /></ProtectedRoute>}>
              <Route path='search' element={<EmployeeAttendance />} />              
            </Route>
            <Route path="attendance-employee/:empCode" element={<AttendanceEmployeeDetail />} />

            <Route path="leave-doc-applied" element={<ProtectedRoute adminCheck={true}><AppliedLeaveList /></ProtectedRoute>}>
              <Route path='search' element={<AppliedLeaveList />} />
            </Route>

            <Route path="subject" element={<ProtectedRoute adminCheck={true}><SubjectList /></ProtectedRoute>}>
              <Route path='search' element={<SubjectList />} />
            </Route>

            <Route path="lecture-student-admin" element={<ProtectedRoute adminCheck={true}><StudentAttendanceForAdmin /></ProtectedRoute>} >
              <Route path='search' element={<StudentAttendanceForAdmin />} />
            </Route>
            <Route path="lecture-student-admin/:lecCode" element={<ProtectedRoute adminCheck={true}><AttendanceDetailList /></ProtectedRoute>} />
            <Route path="lecture-regist-admin" element={<ProtectedRoute adminCheck={true}><RegistLectureForAdmin /></ProtectedRoute>} >
              <Route path='search' element={<RegistLectureForAdmin />} />
            </Route>
            <Route path="lecture-student-prof" element={<ProtectedRoute profCheck={true}><StudentAttendanceForProf /></ProtectedRoute>}>
              <Route path='search' element={<StudentAttendanceForProf />} />
            </Route>
            <Route path="lecture-regist-prof" element={<ProtectedRoute profCheck={true}><RegistLectureForProf /></ProtectedRoute>}>
              <Route path='search' element={<RegistLectureForProf />} />

            </Route>

            <Route path="management-employee" element={<ProtectedRoute adminCheck={true}><EmployeeManagement /></ProtectedRoute>} />
            <Route path="regist-employee" element={<ProtectedRoute adminCheck={true}><EmployeeRegist /></ProtectedRoute>} />
            <Route path="modify-employee/:empCode" element={<ProtectedRoute adminCheck={true}><EmployeeModify /></ProtectedRoute>}/>
            <Route path='search' element={<ProtectedRoute adminCheck={true}><EmployeeManagement /></ProtectedRoute>} />
              
            <Route path="management-student" element={<ProtectedRoute adminCheck={true}><StudentManagement /></ProtectedRoute>} />
            <Route path="regist-student" element={<ProtectedRoute adminCheck={true}><StudentRegist /></ProtectedRoute>} />
            <Route path="modify-student/:stdCode" element={<ProtectedRoute adminCheck={true}><StudentModify /></ProtectedRoute>} />
            <Route path='search' element={<ProtectedRoute adminCheck={true}><StudentManagement /></ProtectedRoute>} />
              
            <Route path="schedule-academic" element={<ProtectedRoute adminCheck={true}><AcademicSchedule /></ProtectedRoute>} />
          </Route>

          {/* <Layout/>의 Route */}
          <Route path="/login" element={<ProtectedRoute loginCheck={false}><Login /></ProtectedRoute>} />
          <Route path="/idsearch" element={<ProtectedRoute loginCheck={false}><IdSearch /></ProtectedRoute>} />
          <Route path="/pwdsearch" element={<ProtectedRoute loginCheck={false}><PwdSearch /></ProtectedRoute>} />

          {/* 설정해둔 path가 아닐 경우 모두 Error 페이지로 이동 */}
          <Route path="*" element={<Error />} />
        </Routes>
      </BrowserRouter >
    </>
  );
}

export default App;