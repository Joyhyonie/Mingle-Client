import { createActions, handleActions } from "redux-actions";

/* 초기값 */
const initialState = {};

/* 액션 */

const POST_LOGIN = 'employee/POST_LOGIN';
const RESET_EMPLOYEE = 'employee/RESET_MEMBER';

export const { employee : { postLogin, resetEmployee }} = createActions({

    [POST_LOGIN] : res => res,
    [RESET_EMPLOYEE] : () => {}
});

/* 리듀서 */
const employeeReducer = handleActions({
    [POST_LOGIN] : (state, {payload}) => ({ login : payload}),
    [RESET_EMPLOYEE] : (state, action) => initialState 

}, initialState);

export default employeeReducer;