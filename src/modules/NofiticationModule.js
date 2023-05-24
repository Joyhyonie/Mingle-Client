import { createActions, handleActions } from "redux-actions";

/* 초기값 */
const initalState = [];

/* 액션 */
const GET_NOTIFICATION = "noti/GET_NOTIFICATION";
const POST_REMOVE_NOTI = "noti/POST_REMOVE_NOTI";
const POST_REMOVE_ALL_NOTI = "noti/POST_REMOVE_ALL_NOTI";

export const { noti : { getNotification, postRemoveNoti, postRemoveAllNoti } } = createActions({
    [GET_NOTIFICATION] : (res) => res.data,
    [POST_REMOVE_NOTI] : (res) => res,
    [POST_REMOVE_ALL_NOTI] : (res) => res
})

/* 리듀서 */
const NotificationReducer = handleActions(
    {
        [GET_NOTIFICATION] : (state, { payload }) => ({ notifications : payload }),
        [POST_REMOVE_NOTI] : (state, { payload }) => ({ remove : payload }),
        [POST_REMOVE_ALL_NOTI] : (state, { payload }) => ({ removeAll : payload }),
    }
, initalState);

export default NotificationReducer;