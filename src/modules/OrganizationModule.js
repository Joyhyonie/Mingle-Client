import { createActions, handleActions } from "redux-actions";

/* 초기값 */
const initialState = {};

/* 액션 */
const GET_LIST = "organization/GET_LIST";
const GET_SEARCHNAME = "organization/GET_SEARCHNAME";
const GET_SEARCHDEPT = "organization/GET_SEARCHDEPT";


export const { organization : 

  { getList }} = createActions

    ({
        [GET_LIST] : res => res.data,
        [GET_SEARCHNAME] : res => res.data,
        [GET_SEARCHDEPT] : res => res.data,
    });

/* 리듀서 */
const OrganizationReducer = handleActions({
  [GET_LIST] : (state , { payload }) => ({ employeeList: payload })


}, initialState);

export default OrganizationReducer; 