import { createActions, handleActions } from "redux-actions";


/* 초기값 */
const initalState = [];

/* 액션 */
const GET_BOARD_PREVIEW = "board/GET_BOARD_PREVIEW";
const GET_BOARD_LIST = "board/GET_BOARD_LIST";
const GET_BOARD_SEARCH = "board/GET_BOARD_SEARCH";
const GET_BOARD_DETAIL = "board/GET_BOARD_DETAIL";
const POST_REGIST_BOARD = "board/POST_REGIST_BOARD";
const PUT_MODIFY_BOARD = "board/PUT_MODIFY_BOARD";
const PATCH_REMOVE_BOARD = "board/PATCH_REMOVE_BOARD";
const PATCH_COUNT_UP_BOARD = "board/PATCH_COUNT_UP_BOARD";

export const { board : { getBoardPreview,
                         getBoardList,
                         getBoardSearch,
                         getBoardDetail,
                         postRegistBoard,
                         putModifyBoard,
                         patchRemoveBoard,
                         patchCountUpBoard } } = createActions({
    [GET_BOARD_PREVIEW] : (res) => res.data,
    [GET_BOARD_LIST] : (res) => res.data,
    [GET_BOARD_SEARCH] : (res) => res.data,
    [GET_BOARD_DETAIL] : (res) => res.data,
    [POST_REGIST_BOARD] : (res) => res,
    [PUT_MODIFY_BOARD] : (res) => res,
    [PATCH_REMOVE_BOARD] : (res) => res,
    [PATCH_COUNT_UP_BOARD] : (res) => res
})

/* 리듀서 */
const BoardReducer = handleActions(
    {
        [GET_BOARD_PREVIEW] : (state, { payload }) => ({ boardPreview : payload }),
        [GET_BOARD_LIST] : (state, { payload }) => ({ boardList : payload }),
        [GET_BOARD_SEARCH] : (state, { payload }) => ({ boardSearch : payload }),
        [GET_BOARD_DETAIL] : (state, { payload }) => ({ board : payload }),
        [POST_REGIST_BOARD] : (state, { payload }) => ({ regist : payload }),
        [PUT_MODIFY_BOARD] : (state, { payload }) => ({ modify : payload }),
        [PATCH_REMOVE_BOARD] : (state, { payload }) => ({ remove : payload }),
        [PATCH_COUNT_UP_BOARD] : (state, { payload }) => ({ countUp : payload })
    }
, initalState);

export default BoardReducer;