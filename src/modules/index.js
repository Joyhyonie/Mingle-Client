import { combineReducers } from "redux";
import EmployeeModule from "./EmployeeModule";
import SubjectReducer from "./SubjectModule";
import CertiReducer from "./CertiModule";

/* 여러 모듈을 combine 시키기 */
const rootReducer = combineReducers({
  SubjectReducer,CertiReducer
import employeeReducer from "../modules/EmployeeModule"
import subjectReducer from "./SubjectModule";

/* 여러 모듈을 combine 시키기 */
const rootReducer = combineReducers({
  subjectReducer, employeeReducer
});

export default rootReducer;




