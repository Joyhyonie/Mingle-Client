import { createActions, handleActions } from "redux-actions";

/* 초기값 */
const initialState = {};

/* 액션 */
const GET_LIST = "organization/GET_LIST";
const GET_SEARCH = "organization/GET_SEARCH";


export const { organization : { getList,
                                getSearch, 
                              }} = createActions

    ({
        [GET_LIST] : res => res.data,
        [GET_SEARCH] : res => res.data,
    });

/* 리듀서 */
const OrganizationReducer = handleActions({
  [GET_LIST] : (state , { payload }) => ({ ...state, employeeList: payload }),
  [GET_SEARCH] : (state, { payload }) => ({ ...state, search: payload}),

}, initialState);

export default OrganizationReducer; 