import { createActions, handleActions } from "redux-actions";

/* 초기값 */
const initialState = {};

/* 액션 */
const POST_LOGIN = 'employee/POST_LOGIN';
const RESET_EMPLOYEE = 'employee/RESET_EMPLOYEE';
const GET_EMPLOYEES = 'employee/GET_ACA_EMPLOYEES';
const GET_AC_EMPLOYEE = 'employee/GET_AC_EMPLOYEE';
const GET_EMPLOYEE = 'employee/GET_EMPLOYEE';
const PATCH_EMPLOYEE = 'employee/PATCH_EMPLOYEE';
const POST_EMPLOYEE = 'employee/POST_EMPLOYEE';
const PUT_EMPLOYEE = 'employee/PUT_EMPLOYEE';
const DELETE_STUDENT = 'employee/DELETE_STUDENT'
const POST_ID = 'employee/POST_ID';
const POST_PWD = 'employee/POST_PWD';
const POST_PWDCHANGE = 'employee/POST_PWDCHANGE';
const GET_SEARCHNAME = 'employee/GET_SEARCHNAME';

export const { employee : { postLogin, 
                            resetEmployee, 
                            getEmployees,
                            getAcEmployee,
                            getEmployee, 
                            postEmployee, 
                            putEmployee, 
                            patchEmployee, 
                            deleteEmployee, 
                            postId, 
                            postPwd, 
                            getSearchname, 
                            postPwdchange,
                          }} = createActions
    ({
      [POST_LOGIN]: res => res,
      [RESET_EMPLOYEE]: () => { },
      [GET_EMPLOYEES]: (res) => res.data,
      [GET_AC_EMPLOYEE]:(res) => res.data,
      [POST_ID]: (res) => res,
      [POST_PWD]: (res) => res,
      [POST_PWDCHANGE]: (res) => res,
      [GET_EMPLOYEE]: res => res.data,
      [PATCH_EMPLOYEE]: (res) => res,
      [POST_EMPLOYEE]: (res) => res,
      [PUT_EMPLOYEE]: (res) => res,
      [GET_SEARCHNAME] : res => res.data,
      [DELETE_STUDENT]: (res) => res,
    });

/* 리듀서 */
const EmployeeReducer = handleActions({
  [POST_LOGIN]: (state, { payload }) => ({ login: payload }),
  [RESET_EMPLOYEE]: (state, { payload }) => payload,
  [GET_EMPLOYEES]: (state, { payload }) => ({ Employees: payload}),
  [GET_AC_EMPLOYEE]: (state, { payload }) => ({ ...state, acEmployee: payload }),
  [GET_EMPLOYEE]: (state, { payload }) => ({ ...state, employee: payload }),
  [POST_EMPLOYEE]: (state, { payload }) => ({ ...state, regist: payload }),
  [PUT_EMPLOYEE]: (state, { payload }) => ({ ...state, modify: payload }),
  [DELETE_STUDENT] : (state, {payload}) => ({ ...state, delete : payload }),
  [PATCH_EMPLOYEE]: (state, { payload }) => payload,
  [POST_ID]:(state, { payload }) => ({ search : payload}),
  [POST_PWD]:(state, { payload }) => ({ search : payload}),
  [POST_PWDCHANGE]:(state, { payload }) => ({ change : payload }),
  [GET_SEARCHNAME] : (state, { payload }) => ({ nameSearch : payload }),
}, initialState); 

export default EmployeeReducer; 