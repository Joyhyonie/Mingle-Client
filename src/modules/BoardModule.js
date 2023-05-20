import { createActions, handleActions } from "redux-actions";


/* 초기값 */
const initalState = [];

/* 액션 */
const GET_BOARD_PREVIEW = "board/GET_BOARD_PREVIEW";

export const { board : { getBoardPreview } } = createActions({
    [GET_BOARD_PREVIEW] : (res) => res.data,
})

/* 리듀서 */
const BoardReducer = handleActions(
    {
        [GET_BOARD_PREVIEW] : (state, { payload }) => ({ boardPreview : payload }),
    }
, initalState);

export default BoardReducer;