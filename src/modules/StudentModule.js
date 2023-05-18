import { createActions, handleActions } from "redux-actions";

/* 초기값 */
const initialState = {};

/* 액션 */

const GET_STUDENTS = 'student/GET_STUDENTS';

export const { student : 
  { getStudents }} = createActions
  ({
    [GET_STUDENTS] : (res) => res.data,
});

/* 리듀서 */
const StudentReducer = handleActions({
  [GET_STUDENTS] : (state, {payload}) => payload,

}, initialState);

export default StudentReducer;