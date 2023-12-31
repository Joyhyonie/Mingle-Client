import { createActions, handleActions } from "redux-actions";

/* 초기값 */
const initialState = {};

/* 액션 */

const GET_STUDENTS = 'student/GET_STUDENTS';
const GET_STUDENT = 'student/GET_STUDENT'
const POST_STUDENT = 'student/POST_STUDENT';
const PUT_STUDENT = 'student/PUT_STUDENT';
const DELETE_STUDENT = 'student/DELETE_STUDENT';
const GET_SEARCH_STUDENT = 'student/GET_SEARCH_STUDENT';

export const { student : 
  { getStudents, getStudent, postStudent, putStudent, deleteStudent, getSearchStudent }} = createActions
  ({
    [GET_STUDENTS] : (res) => res.data,
    [GET_STUDENT] : (res) => res.data,
    [POST_STUDENT] : (res) => res,
    [PUT_STUDENT] : (res) => res,
    [DELETE_STUDENT] : (res) => res,
    [GET_SEARCH_STUDENT] : (res) => res,
});

/* 리듀서 */
const StudentReducer = handleActions({
  [GET_STUDENTS] : (state, { payload }) => ({ students : payload }),
  [GET_STUDENT] : (state, { payload }) =>  ({ ...state, Student : payload }),
  [POST_STUDENT] : (state, { payload }) => ({ ...state, regist : payload }),
  [PUT_STUDENT] : (state, { payload }) => ({ ...state, modify : payload }),
  [DELETE_STUDENT] : (state, { payload }) => ({ ...state, delete : payload }),
  [GET_SEARCH_STUDENT] : (state, { payload }) => ({ search : payload }),

}, initialState);

export default StudentReducer;