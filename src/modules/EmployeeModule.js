import { createActions } from "redux-actions";
import { handleActions } from 'redux-actions';


/* 초기값 */
const initialState = {
  data: [],
  pageInfo: null
};

/* 액션 */
const GET_EMPLOYEES = 'employee/GET_EMPLOYEES';
const GET_EMPLOYEE = 'employee/GET_EMPLOYEE';
const POST_EMPLOYEE = 'employee/POST_EMPLOYEE';
const PUT_EMPLOYEE = 'employee/PUT_EMPLOYEE';

export const { employee : { getEmployees, getEmployee, postEmployee, putEmployee } } = createActions({
  [GET_EMPLOYEES] : res => res.data,
  [GET_EMPLOYEE] : res => res.data,
  [POST_EMPLOYEE] : res => res,
  [PUT_EMPLOYEE] : res => res
});

/* 리듀서 */
const employeeReducer = handleActions(
  {
    [GET_EMPLOYEES] : (state, { payload }) => payload,
    [GET_EMPLOYEE] : (state, { payload }) => ({employee:payload}),
    [POST_EMPLOYEE] : (state, { payload }) => ({ regist : payload }),
    [PUT_EMPLOYEE] : (state, { payload }) => ({ modify : payload })
  }
  , initialState
);

export default employeeReducer;