import { combineReducers } from "redux";
import EmployeeModule from "./EmployeeModule";
import SubjectReducer from "./SubjectModule";
import CertiReducer from "./CertiModule";

/* 여러 모듈을 combine 시키기 */
const rootReducer = combineReducers({
  SubjectReducer,CertiReducer
});

export default rootReducer;




