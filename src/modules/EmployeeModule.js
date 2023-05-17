
import { createActions, handleActions } from "redux-actions";

/* 초기값 */
const initialState = {};

/* 액션 */

const POST_LOGIN = 'employee/POST_LOGIN';
const RESET_EMPLOYEE = 'employee/RESET_MEMBER';
const GET_EMPLOYEES = 'employee/GET_EMPLOYEES';
const GET_EMPLOYEE = 'employee/GET_EMPLOYEE';

export const { employee : 
  { postLogin, resetEmployee, getEmployees, getEmployee }} = createActions
  ({

    [POST_LOGIN] : res => res,
    [RESET_EMPLOYEE] : () => {},
    [GET_EMPLOYEES] : (res) => res.data,
    [GET_EMPLOYEE] : res => res

});

/* 리듀서 */
const EmployeeReducer = handleActions({
    [POST_LOGIN] : (state, {payload}) => ({ login : payload}),
    [RESET_EMPLOYEE] : (state, {payload}) => initialState,
    [GET_EMPLOYEES] : (state, {payload}) => payload,
    [GET_EMPLOYEE] : (state, {payload}) => ({employee : payload})


}, initialState);

export default EmployeeReducer; 