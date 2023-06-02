import { createActions, handleActions } from "redux-actions";

/* 초기값 */
const initalState = [];

/* 액션 */
const GET_COUNT_UNREAD_MSG = "schedule/GET_COUNT_UNREAD_MSG";
const GET_RECEIVED_MSG = "schedule/GET_RECEIVED_MSG";
const GET_RECEIVED_MSG_SEARCH = "schedule/GET_RECEIVED_MSG_SEARCH";
const PATCH_READ_MSG = "schedule/PATCH_READ_MSG";
const GET_SENT_MSG = "schedule/GET_SENT_MSG";
const GET_SENT_MSG_SEARCH = "schedule/GET_SENT_MSG_SEARCH";
const GET_LIKED_MSG = "schedule/GET_LIKED_MSG";
const GET_LIKED_MSG_SEARCH = "schedule/GET_LIKED_MSG_SEARCH";
const GET_REMOVED_MSG = "schedule/GET_REMOVED_MSG";
const PATCH_LIKE_MSG = "schedule/PATCH_LIKE_MSG";
const GET_DEPARTMENT_FOR_SEND = "schedule/GET_DEPARTMENT_FOR_SEND";
const GET_EMPLOYEE_FOR_SEND = "schedule/GET_EMPLOYEE_FOR_SEND";
const POST_SEND_MSG = "schedule/POST_SEND_MSG";
const PATCH_REMOVE_MSG = "schedule/PATCH_REMOVE_MSG";
const PATCH_RESTORE_MSG = "schedule/PATCH_RESTORE_MSG";

export const { schedule : { getCountUnreadMsg,
                            getReceivedMsg,
                            getReceivedMsgSearch,
                            patchReadMsg,
                            getSentMsg,
                            getSentMsgSearch,
                            getLikedMsg,
                            getLikedMsgSearch,
                            getRemovedMsg,
                            patchLikeMsg,
                            getDepartmentForSend,
                            getEmployeeForSend,
                            postSendMsg,
                            patchRemoveMsg,
                            patchRestoreMsg
                            } } = createActions({
    [GET_COUNT_UNREAD_MSG] : (res) => res.data,
    [GET_RECEIVED_MSG] : (res) => res.data,
    [GET_RECEIVED_MSG_SEARCH] : (res) => res.data,
    [PATCH_READ_MSG] : (res) => res,
    [GET_SENT_MSG] : (res) => res.data,
    [GET_SENT_MSG_SEARCH] : (res) => res.data,
    [GET_LIKED_MSG] : (res) => res.data,
    [GET_LIKED_MSG_SEARCH] : (res) => res.data,
    [GET_REMOVED_MSG] : (res) => res.data,
    [PATCH_LIKE_MSG] : (res) => res,
    [GET_DEPARTMENT_FOR_SEND] : (res) => res.data,
    [GET_EMPLOYEE_FOR_SEND] : (res) => res.data,
    [POST_SEND_MSG] : (res) => res,
    [PATCH_REMOVE_MSG] : (res) => res,
    [PATCH_RESTORE_MSG] : (res) => res
})

/* 리듀서 */
const MessageReducer = handleActions(
    {
        // 읽지 않은 쪽지(countMsg)는 다른 함수(GET)가 호출되어도 유지하고자 하므로 `countMsg : state.countMsg`를 추가하여 덮어쓰기 방지
        [GET_COUNT_UNREAD_MSG] : (state, { payload }) => ({ ...state, countMsg : payload }), // 쪽지를 읽을 때마다 안 읽은 쪽지의 갯수를 리렌더링 하고자 state 복사
        [GET_RECEIVED_MSG] : (state, { payload }) => ({ countMsg : state.countMsg, receivedMsg : payload }),
        [GET_RECEIVED_MSG_SEARCH] : (state, { payload }) => ({ countMsg : state.countMsg, receivedMsgSearch : payload }),
        [PATCH_READ_MSG] : (state, { payload }) => ({ ...state, readMsg : payload }),
        [GET_SENT_MSG] : (state, { payload }) => ({ countMsg : state.countMsg, sentMsg : payload }),
        [GET_SENT_MSG_SEARCH] : (state, { payload }) => ({ countMsg : state.countMsg, sentMsgSearch : payload }),
        [GET_LIKED_MSG] : (state, { payload }) => ({ countMsg : state.countMsg, likedMsg : payload }),
        [GET_LIKED_MSG_SEARCH] : (state, { payload }) => ({ countMsg : state.countMsg, likedMsgSearch : payload }),
        [GET_REMOVED_MSG] : (state, { payload }) => ({ countMsg : state.countMsg, removedMsg : payload }),
        [PATCH_LIKE_MSG] : (state, { payload }) => ({ ...state, likeMsg : payload }),
        [GET_DEPARTMENT_FOR_SEND] : (state, { payload }) => ({ countMsg : state.countMsg, departmentList : payload }),
        [GET_EMPLOYEE_FOR_SEND] : (state, { payload }) => ({ ...state, countMsg : state.countMsg, employeeList : payload }),
        [POST_SEND_MSG] : (state, { payload }) => ({ sendMsg : payload }),
        [PATCH_REMOVE_MSG] : (state, { payload }) => ({ removeMsg : payload }),
        [PATCH_RESTORE_MSG] : (state, { payload }) => ({ ...state, restoreMsg : payload })
    }
, initalState);

export default MessageReducer;