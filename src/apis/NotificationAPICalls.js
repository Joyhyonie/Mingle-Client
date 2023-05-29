import { getBoardPreview } from "../modules/BoardModule";
import { getNotification, postRemoveAllNoti, postRemoveNoti } from "../modules/NofiticationModule";
import { request } from "./Api";

/* 1. 유효한 알림 전체 조회 */
export function callNotificationListAPI () {

    return async (dispatch, getState) => {

        const headers = {
            "Content-Type": "application/json",
            Authorization: "Bearer " + window.localStorage.getItem("accessToken"),
        };

        const result = await request('GET', `/notification/all`, headers);

        if(result.status == 200) {
            dispatch(getNotification(result));
        }

    }

}

/* 2. 알림 개별 삭제 */
export function callNotificationRemoveAPI (notiCode) {

    return async (dispatch, getState) => {

        const headers = {
            "Content-Type": "application/json",
            Authorization: "Bearer " + window.localStorage.getItem("accessToken"),
        };

        const result = await request('POST', `/notification/remove/${notiCode}`, headers);

        if(result.status == 200) {
            dispatch(postRemoveNoti(result));
        }

    }

}

/* 3. 알림 전체 삭제 */
export function callNotificationRemoveAllAPI (notiCode) {

    return async (dispatch, getState) => {

        const headers = {
            "Content-Type": "application/json",
            Authorization: "Bearer " + window.localStorage.getItem("accessToken"),
        };

        const result = await request('POST', `/notification/remove/all`, headers);

        if(result.status == 200) {
            dispatch(postRemoveAllNoti(result));
        }

    }

}