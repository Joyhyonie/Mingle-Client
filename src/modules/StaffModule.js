import { createActions, handleActions } from "redux-actions";

/* 초기값 */
const initialState = {};

/* 액션 */
const GET_STAFFS = 'staff/GET_STAFFS';
const GET_STAFF = 'staff/GET_STAFF';
const POST_STAFF = 'staff/POST_STAFF';
const PUT_STAFF = 'staff/PUT_STAFF';
const DELETE_STAFF = 'staff/DELETE_STAFF';
const GET_SEARCH_NAME = 'staff/GET_SEARCH_NAME';

export const { staff : { 
                            getStaffs,
                            getStaff,
                            postStaff,
                            putStaff,
                            deleteStaff,
                            getSearchName,
                          }} = createActions
    ({
      [GET_STAFFS]: (res) => res.data,
      [GET_STAFF]:(res) => res.data,
      [POST_STAFF]: (res) => res,
      [PUT_STAFF]: (res) => res,
      [DELETE_STAFF]: (res) => res,
      [GET_SEARCH_NAME]: (res) => res,
    });

/* 리듀서 */
const StaffReducer = handleActions({
  [GET_STAFFS]: (state, { payload }) => ({ Employees: payload}),
  [GET_STAFF]: (state, { payload }) => ({ ...state, acEmployee: payload }),
  [POST_STAFF]: (state, { payload }) => ({ ...state, regist: payload }),
  [PUT_STAFF]: (state, { payload }) => ({ ...state, modify: payload }),
  [DELETE_STAFF] : (state, {payload}) => ({ ...state, delete : payload }),
  [GET_SEARCH_NAME] : (state, { payload }) => ({ nameSearch : payload }),
}, initialState); 


export default StaffReducer; 