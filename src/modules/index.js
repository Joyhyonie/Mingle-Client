import { combineReducers } from "redux";
import EmployeeReducer from "./EmployeeModule";
import SubjectReducer from "./SubjectModule";
import CertiReducer from "./CertiModule";
import SubjectInfoReducer from "./LectureModule";
import AttendanceReducer from './Attendance';
import StudentReducer from "./StudentModule";
import ScheduleReducer from "./ScheduleModule";


/* 여러 모듈을 combine 시키기 */
const rootReducer = combineReducers({
  SubjectReducer, CertiReducer, EmployeeReducer, StudentReducer, ScheduleReducer, AttendanceReducer, SubjectInfoReducer

});

export default rootReducer;




