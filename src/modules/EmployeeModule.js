
import { createActions, handleActions } from "redux-actions";

/* 초기값 */
const initialState = {};

/* 액션 */

const POST_LOGIN = 'employee/POST_LOGIN';
const RESET_EMPLOYEE = 'employee/RESET_EMPLOYEE';
const GET_EMPLOYEES = 'employee/GET_EMPLOYEES';
const GET_EMPLOYEE = 'employee/GET_EMPLOYEE';
const PATCH_EMPLOYEE = 'employee/PATCH_EMPLOYEE';

export const { employee : 
  { postLogin, resetEmployee, getEmployees, getEmployee, patchEmployee }} = createActions
  ({

    [POST_LOGIN] : res => res,
    [RESET_EMPLOYEE] : () => {},
    [GET_EMPLOYEES] : (res) => res.data,
    [GET_EMPLOYEE] : res => res,
    [PATCH_EMPLOYEE] : (res) => res

});

/* 리듀서 */
const EmployeeReducer= handleActions({
    [POST_LOGIN] : (state, {payload}) => ({ login : payload}),
    // [RESET_EMPLOYEE] : (state, action) => initialState,
const EmployeeReducer = handleActions({
    [POST_LOGIN] : (state, {payload}) => ({ login : payload}),
    [RESET_EMPLOYEE] : (state, action) => initialState,
    [GET_EMPLOYEES] : (state, {payload}) => payload,
    [GET_EMPLOYEE] : (state, {payload}) => ({employee : payload}),
    [PATCH_EMPLOYEE] : (state, {payload}) => payload


}, initialState);

export default EmployeeReducer;