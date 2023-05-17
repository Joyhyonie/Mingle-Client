import { combineReducers } from "redux";
import EmployeeReducer from "./EmployeeModule";
import SubjectReducer from "./SubjectModule";
import CertiReducer from "./CertiModule";
import employeeReducer from "./EmployeeModule";


/* 여러 모듈을 combine 시키기 */
const rootReducer = combineReducers({
  SubjectReducer, CertiReducer, EmployeeReducer, employeeReducer
});

export default rootReducer;




