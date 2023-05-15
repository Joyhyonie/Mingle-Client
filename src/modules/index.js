import { combineReducers } from "redux";
import EmployeeModule from "./EmployeeModule";
import subjectReducer from "./SubjectModule";

/* 여러 모듈을 combine 시키기 */
const rootReducer = combineReducers({
  subjectReducer
});

export default rootReducer;




