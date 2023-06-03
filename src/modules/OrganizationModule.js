import { createActions, handleActions } from "redux-actions";

/* 초기값 */
const initialState = {};

/* 액션 */
const GET_LIST = "organization/GET_LIST";
const GET_SEARCH_NAME = "organization/GET_SEARCH_NAME";


export const { organization: { getList,
                               getSearchName,
} } = createActions

    ({
      [GET_LIST]: res => res.data,
      [GET_SEARCH_NAME]: res => res.data,
    });

/* 리듀서 */
const OrganizationReducer = handleActions({
  [GET_LIST]: (state, { payload }) => ({ ...state, employeeList: payload }),
  [GET_SEARCH_NAME]: (state, { payload }) => ({ ...state, searchName: payload }),

}, initialState);

export default OrganizationReducer; 