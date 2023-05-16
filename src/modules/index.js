import { combineReducers } from "redux";
import employeeReducer from "../modules/EmployeeModule"
import subjectReducer from "./SubjectModule";

/* 여러 모듈을 combine 시키기 */
const rootReducer = combineReducers({
  subjectReducer, employeeReducer
});

export default rootReducer;




