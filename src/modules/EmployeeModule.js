
import { createActions, handleActions } from "redux-actions";

/* 초기값 */
const initialState = {};

/* 액션 */

const POST_LOGIN = 'employee/POST_LOGIN';
const GET_EMPLOYEE = 'employee/GET_EMPLOYEE'

export const { employee : { postLogin, resetEmployee, getEmployee }} = createActions({

    [POST_LOGIN] : res => res,
    [GET_EMPLOYEE] : res => res

});

/* 리듀서 */
const EmployeeReducer= handleActions({
    [POST_LOGIN] : (state, {payload}) => ({ login : payload}),
    // [RESET_EMPLOYEE] : (state, action) => initialState,
    [GET_EMPLOYEE] : (state, {payload}) => ({employee : payload})


}, initialState);

export default EmployeeReducer;