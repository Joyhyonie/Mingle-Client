import { combineReducers } from "redux";
import EmployeeReducer from "./EmployeeModule";
import SubjectReducer from "./SubjectModule";
import CertiReducer from "./CertiModule";
import StudentReducer from "./StudentModule";

/* 여러 모듈을 combine 시키기 */
const rootReducer = combineReducers({
  SubjectReducer, CertiReducer, EmployeeReducer, StudentReducer
});

export default rootReducer;




