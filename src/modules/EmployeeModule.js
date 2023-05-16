
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
const employeeReducer = handleActions({
    [POST_LOGIN] : (state, {payload}) => ({ login : payload}),
    [GET_EMPLOYEE] : (state, {payload}) => ({employee : payload})


}, initialState);

export default employeeReducer;