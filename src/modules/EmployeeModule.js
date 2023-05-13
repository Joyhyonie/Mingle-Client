import { createActions } from "redux-actions";

/* 초기값 */
const initialState = [];

/* 액션 */
const GET_EMPLOYEES = 'employee/GET_EMPLOYEES';

export const { product : { getProducts } } = createActions({
  [GET_EMPLOYEES] : () => {}
});

/* 리듀서 */