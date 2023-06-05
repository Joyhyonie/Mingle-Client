import { createActions, handleActions } from "redux-actions";

/* 초기값 */
const initialState = {};

/* 액션 */
const GET_STAFFS = 'staff/GET_STAFFS';
const GET_STAFF = 'staff/GET_STAFF';
const POST_STAFF = 'staff/POST_STAFF';
const PUT_STAFF = 'staff/PUT_STAFF';
const DELETE_STAFF = 'staff/DELETE_STAFF';
const GET_SEARCH = 'staff/GET_SEARCH';

export const { staff : { 
                            getStaffs,
                            getStaff,
                            postStaff,
                            putStaff,
                            deleteStaff,
                            getSearch,
                          }} = createActions
    ({
      [GET_STAFFS]: (res) => res.data,
      [GET_STAFF]:(res) => res.data,
      [POST_STAFF]: (res) => res,
      [PUT_STAFF]: (res) => res,
      [DELETE_STAFF]: (res) => res,
      [GET_SEARCH]: (res) => res,
    });

/* 리듀서 */
const StaffReducer = handleActions({
  [GET_STAFFS]: (state, { payload }) => ({ Employees: payload}),
  [GET_STAFF]: (state, { payload }) => ({ ...state, Employee: payload }),
  [POST_STAFF]: (state, { payload }) => ({ ...state, regist: payload }),
  [PUT_STAFF]: (state, { payload }) => ({ ...state, modify: payload }),
  [DELETE_STAFF] : (state, {payload}) => ({ ...state, delete : payload }),
  [GET_SEARCH] : (state, { payload }) => ({ search : payload }),
}, initialState); 


export default StaffReducer; 