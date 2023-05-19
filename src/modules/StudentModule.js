import { createActions, handleActions } from "redux-actions";

/* 초기값 */
const initialState = {};

/* 액션 */

const GET_STUDENTS = 'student/GET_STUDENTS';
const GET_STUDENT = 'student/GET_STUDENT'
const POST_STUDENT = 'student/POST_STUDENT';
const PUT_STUDENT = 'student/PUT_STUDENT';

export const { student : 
  { getStudents, getStudent, postStudent, putStudent }} = createActions
  ({
    [GET_STUDENTS] : (res) => res.data,
    [GET_STUDENT] : (res) => res.data,
    [POST_STUDENT] : (res) => res,
    [PUT_STUDENT] : (res) => res,
});

/* 리듀서 */
const StudentReducer = handleActions({
  [GET_STUDENTS] : (state, {payload}) => payload,
  [GET_STUDENT] : (state, {payload}) => payload,
  [POST_STUDENT] : (state, {payload}) => ({regist : payload}),
  [PUT_STUDENT] : (state, {payload}) => ({modify : payload}),

}, initialState);

export default StudentReducer;