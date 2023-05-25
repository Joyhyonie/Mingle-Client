import { createActions, handleActions } from "redux-actions";

/* 초기값 */
const initialState = {};

/* 액션 */
const GET_LIST = "organization/GET_LIST";


export const { organization : 

  { getList }} = createActions

    ({
        [GET_LIST] : res => res.data
      
    });

/* 리듀서 */
const OrganizationReducer = handleActions({
  [GET_LIST] : (state , {payload}) => ({employeeList: payload})


}, initialState);

export default OrganizationReducer; 