import { createActions, handleActions } from "redux-actions";

/* 초기값 */
const initalState = [];

/* 액션 */
const GET_RECEIVED_MSG = "schedule/GET_RECEIVED_MSG";
const GET_RECEIVED_MSG_SEARCH = "schedule/GET_RECEIVED_MSG_SEARCH";
const PATCH_READ_MSG = "schedule/PATCH_READ_MSG";
const GET_SENT_MSG = "schedule/GET_SENT_MSG";
const GET_SENT_MSG_SEARCH = "schedule/GET_SENT_MSG_SEARCH";
const GET_LIKED_MSG = "schedule/GET_LIKED_MSG";
const GET_LIKED_MSG_SEARCH = "schedule/GET_LIKED_MSG_SEARCH";
const PATCH_LIKE_MSG = "schedule/PATCH_LIKE_MSG";
const GET_DEPARTMENT_FOR_SEND = "schedule/GET_DEPARTMENT_FOR_SEND";
const GET_EMPLOYEE_FOR_SEND = "schedule/GET_EMPLOYEE_FOR_SEND";
const POST_SEND_MSG = "schedule/POST_SEND_MSG";
const PATCH_REMOVE_MSG = "schedule/PATCH_REMOVE_MSG";

export const { schedule : { getReceivedMsg,
                            getReceivedMsgSearch,
                            patchReadMsg,
                            getSentMsg,
                            getSentMsgSearch,
                            getLikedMsg,
                            getLikedMsgSearch,
                            patchLikeMsg,
                            getDepartmentForSend,
                            getEmployeeForSend,
                            postSendMsg,
                            patchRemoveMsg
                            } } = createActions({
    [GET_RECEIVED_MSG] : (res) => res.data,
    [GET_RECEIVED_MSG_SEARCH] : (res) => res.data,
    [PATCH_READ_MSG] : (res) => res,
    [GET_SENT_MSG] : (res) => res.data,
    [GET_SENT_MSG_SEARCH] : (res) => res.data,
    [GET_LIKED_MSG] : (res) => res.data,
    [GET_LIKED_MSG_SEARCH] : (res) => res.data,
    [PATCH_LIKE_MSG] : (res) => res,
    [GET_DEPARTMENT_FOR_SEND] : (res) => res.data,
    [GET_EMPLOYEE_FOR_SEND] : (res) => res.data,
    [POST_SEND_MSG] : (res) => res,
    [PATCH_REMOVE_MSG] : (res) => res,
})

/* 리듀서 */
const MessageReducer = handleActions(
    {
        [GET_RECEIVED_MSG] : (state, { payload }) => ({ receivedMsg : payload }),
        [GET_RECEIVED_MSG_SEARCH] : (state, { payload }) => ({ receivedMsgSearch : payload }),
        [PATCH_READ_MSG] : (state, { payload }) => ({ ...state, readMsg : payload }),
        [GET_SENT_MSG] : (state, { payload }) => ({ sentMsg : payload }),
        [GET_SENT_MSG_SEARCH] : (state, { payload }) => ({ sentMsgSearch : payload }),
        [GET_LIKED_MSG] : (state, { payload }) => ({ likedMsg : payload }),
        [GET_LIKED_MSG_SEARCH] : (state, { payload }) => ({ likedMsgSearch : payload }),
        [PATCH_LIKE_MSG] : (state, { payload }) => ({ ...state, likeMsg : payload }),
        [GET_DEPARTMENT_FOR_SEND] : (state, { payload }) => ({ department : payload }),
        [GET_EMPLOYEE_FOR_SEND] : (state, { payload }) => ({ employee : payload }),
        [POST_SEND_MSG] : (state, { payload }) => ({ sendMsg : payload }),
        [PATCH_REMOVE_MSG] : (state, { payload }) => ({ removeMsg : payload }),
    }
, initalState);

export default MessageReducer;