import { combineReducers } from "redux";
import EmployeeReducer from "./EmployeeModule";
import SubjectReducer from "./SubjectModule";
import CertiReducer from "./CertiModule";
import employeeReducer from "./EmployeeModule";
import subjectInfoReducer from "./LectureModule";


/* 여러 모듈을 combine 시키기 */
const rootReducer = combineReducers({

  SubjectReducer, CertiReducer, EmployeeReducer, employeeReducer, subjectInfoReducer



});

export default rootReducer;




