import { getCountUnreadMsg, getDeletedMsg, getDepartmentForSend, getEmployeeForSend, getLikedMsg, getLikedMsgSearch, getReceivedMsg, getReceivedMsgSearch, getRemovedMsg, getSentMsg, getSentMsgSearch, patchLikeMsg, patchReadMsg, patchRemoveMsg, patchRestoreMsg, postSendMsg } from "../modules/MessageModule";
import { request } from "./Api";

/* 읽지 않은 쪽지 갯수 조회 */
export function callUnreadMsgCountAPI() {

    return async (dispatch, getState) => {

        const headers = {
            "Content-Type": "application/json",
            Authorization: "Bearer " + window.localStorage.getItem("accessToken"),
        };

        const result = await request('GET', `/message/unread`, headers);

        if(result.status == 200) {
            dispatch(getCountUnreadMsg(result));
        }

    }

}

/* 받은 쪽지함 조회 */
export function callReceivedMsgListAPI(currentSize) {

    return async (dispatch, getState) => {

        const headers = {
            "Content-Type": "application/json",
            Authorization: "Bearer " + window.localStorage.getItem("accessToken"),
        };

        const result = await request('GET', `/message/received?size=${currentSize}`, headers);

        if(result.status == 200) {
            dispatch(getReceivedMsg(result));
        }

    }

}

/* 교직원명/내용으로 쪽지 검색 후 조회 (받은 쪽지함) */
export function callReceivedMsgSearchAPI(condition, word, searchedCurrentSize) {

    return async (dispatch, getState) => {

        const headers = {
            "Content-Type": "application/json",
            Authorization: "Bearer " + window.localStorage.getItem("accessToken"),
        };

        const result = await request('GET', `/message/received/search?condition=${condition}&word=${word}&size=${searchedCurrentSize}`, headers);

        if(result.status == 200) {
            dispatch(getReceivedMsgSearch(result));
        }

    }

}

/* 받은 쪽지 클릭 시, 쪽지 읽음 표시 */
export function callReadMsgAPI(msgCode) {

    return async (dispatch, getState) => {

        const headers = {
            "Content-Type": "application/json",
            Authorization: "Bearer " + window.localStorage.getItem("accessToken"),
        };

        const result = await request('PATCH', `/message/read/${msgCode}`, headers);

        if(result.status == 200) {
            dispatch(patchReadMsg(result));
        }

    }

}

/* 보낸 쪽지함 조회 */
export function callSentMsgListAPI(currentSize) {

    return async (dispatch, getState) => {

        const headers = {
            "Content-Type": "application/json",
            Authorization: "Bearer " + window.localStorage.getItem("accessToken"),
        };

        const result = await request('GET', `/message/sent?size=${currentSize}`, headers);

        if(result.status == 200) {
            dispatch(getSentMsg(result));
        }

    }

}

/* 교직원명/내용으로 쪽지 검색 후 조회 (보낸 쪽지함) */
export function callSentMsgSearchAPI(condition, word, searchedCurrentSize) {

    return async (dispatch, getState) => {

        const headers = {
            "Content-Type": "application/json",
            Authorization: "Bearer " + window.localStorage.getItem("accessToken"),
        };

        const result = await request('GET', `/message/sent/search?condition=${condition}&word=${word}&size=${searchedCurrentSize}`, headers);

        if(result.status == 200) {
            dispatch(getSentMsgSearch(result));
        }

    }

}

/* 중요 쪽지함 조회 */
export function callLikedMsgListAPI(currentSize) {

    return async (dispatch, getState) => {

        const headers = {
            "Content-Type": "application/json",
            Authorization: "Bearer " + window.localStorage.getItem("accessToken"),
        };

        const result = await request('GET', `/message/liked?size=${currentSize}`, headers);

        if(result.status == 200) {
            dispatch(getLikedMsg(result));
        }

    }

}

/* 교직원명/내용으로 쪽지 검색 후 조회 (중요 쪽지함) */
export function callLikedMsgSearchAPI(condition, word, searchedCurrentSize) {

    return async (dispatch, getState) => {

        const headers = {
            "Content-Type": "application/json",
            Authorization: "Bearer " + window.localStorage.getItem("accessToken"),
        };

        const result = await request('GET', `/message/liked/search?condition=${condition}&word=${word}&size=${searchedCurrentSize}`, headers);

        if(result.status == 200) {
            dispatch(getLikedMsgSearch(result));
        }

    }

}

/* 휴지통 조회 */
export function callRemovedMsgListAPI(currentSize) {

    return async (dispatch, getState) => {

        const headers = {
            "Content-Type": "application/json",
            Authorization: "Bearer " + window.localStorage.getItem("accessToken"),
        };

        const result = await request('GET', `/message/removed?size=${currentSize}`, headers);

        if(result.status == 200) {
            dispatch(getRemovedMsg(result));
        }

    }

}

/* 하트 클릭 시, 중요 쪽지함으로 이동 및 취소 */
export function callLikeMsgAPI(msgCode) {

    return async (dispatch, getState) => {

        const headers = {
            "Content-Type": "application/json",
            Authorization: "Bearer " + window.localStorage.getItem("accessToken"),
        };

        const result = await request('PATCH', `/message/like/${msgCode}`, headers);

        if(result.status == 200) {
            dispatch(patchLikeMsg(result));
        }

    }

}

/* 상위 카테고리가 존재하는 소속 전체 조회 */
export function callDepartmentListAPI() {

    return async (dispatch, getState) => {

        const result = await request('GET', `/message/find/department`);

        if(result.status == 200) {
            dispatch(getDepartmentForSend(result));
        }

    }

}

/* 소속 선택 시, 해당 소속 교직원 조회 */
export function callEmployeeListAPI(deptCode) {

    return async (dispatch, getState) => {

        const result = await request('GET', `/message/find/employee/${deptCode}`);

        if(result.status == 200) {
            dispatch(getEmployeeForSend(result));
        }

    }

}

/* 쪽지 전송 */
export function callSendMsgAPI(formData) {

    return async (dispatch, getState) => {

        const headers = {
            Authorization: "Bearer " + window.localStorage.getItem("accessToken"),
        };

        const result = await request('POST', `/message/send`, headers, formData);

        if(result.status == 200) {
            dispatch(postSendMsg(result));
        }

    }

}

/* 선택한 쪽지 삭제 */
export function callRemoveMsgAPI(msgCodes) {

    return async (dispatch, getState) => {

        const headers = {
            "Content-Type": "application/json",
            Authorization: "Bearer " + window.localStorage.getItem("accessToken"),
        };

        const messageDTO = {
            selectedMsgs: msgCodes
        };

        const result = await request('PATCH', `/message/remove`, headers, messageDTO);

        if(result.status == 200) {
            dispatch(patchRemoveMsg(result));
        }

    }

}

/* 선택한 쪽지 복구 */
export function callRestoreMsgAPI(msgCodes) {

    return async (dispatch, getState) => {

        const headers = {
            "Content-Type": "application/json",
            Authorization: "Bearer " + window.localStorage.getItem("accessToken"),
        };

        const messageDTO = {
            selectedMsgs: msgCodes
        };

        const result = await request('PATCH', `/message/restore`, headers, messageDTO);

        if(result.status == 200) {
            dispatch(patchRestoreMsg(result));
        }

    }

}