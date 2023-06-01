import { createActions, handleActions } from "redux-actions";

/* 초기값 */
const initialState = {
  Employees: [],
};

/* 액션 */
const POST_LOGIN = 'employee/POST_LOGIN';
const RESET_EMPLOYEE = 'employee/RESET_EMPLOYEE';
const GET_EMPLOYEE = 'employee/GET_EMPLOYEE';
const PATCH_EMPLOYEE = 'employee/PATCH_EMPLOYEE';
const POST_ID = 'employee/POST_ID';
const POST_PWD = 'employee/POST_PWD';
const POST_PWDCHANGE = 'employee/POST_PWDCHANGE';

export const { employee : { postLogin, 
                            resetEmployee, 
                            getEmployee, 
                            patchEmployee, 
                            postId, 
                            postPwd, 
                            postPwdchange,
                          }} = createActions
    ({
      [POST_LOGIN]: res => res,
      [RESET_EMPLOYEE]: () => { },
      [POST_ID]: (res) => res,
      [POST_PWD]: (res) => res,
      [POST_PWDCHANGE]: (res) => res,
      [GET_EMPLOYEE]: res => res.data,
      [PATCH_EMPLOYEE]: (res) => res,
    });

/* 리듀서 */
const EmployeeReducer = handleActions({
  [POST_LOGIN]: (state, { payload }) => ({ login: payload }),
  [RESET_EMPLOYEE]: (state, { payload }) => payload,
  [GET_EMPLOYEE]: (state, { payload }) => ({ ...state, employee: payload }),
  [PATCH_EMPLOYEE]: (state, { payload }) => payload,
  [POST_ID]:(state, { payload }) => ({ search : payload}),
  [POST_PWD]:(state, { payload }) => ({ search : payload}),
  [POST_PWDCHANGE]:(state, { payload }) => ({ change : payload }),
}, initialState); 


export default EmployeeReducer; 