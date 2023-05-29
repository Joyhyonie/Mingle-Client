import { getBoardDetail, getBoardList, getBoardPreview, getBoardSearch, patchCountUpBoard, patchRemoveBoard, postRegistBoard, putModifyBoard } from "../modules/BoardModule";
import { request } from "./Api";

/* 1. 최신 공지사항 7개 조회 */
export function callBoardPreviewAPI () {

    return async (dispatch, getState) => {

        const result = await request('GET', `/board/preview`);

        if(result.status == 200) {
            dispatch(getBoardPreview(result));
        }

    }

}

/* 2. 전체 공지사항 조회(페이징) */
export function callBoardListAPI ({currentPage = 1}) {

    return async (dispatch, getState) => {

        const result = await request('GET', `/board/list?page=${currentPage}`);

        if(result.status == 200) {
            dispatch(getBoardList(result));
        }

    }

}

/* 3. 분류 및 검색기준별 공지사항 조회(페이징) */
export function callBoardSearchAPI ({currentPage = 1, boardType, condition, word}) {

    return async (dispatch, getState) => {

        const result = await request('GET', `/board/search?page=${currentPage}&type=${boardType}&condition=${condition}&word=${word}`);

        if(result.status == 200) {
            dispatch(getBoardSearch(result));
        }

    }

}

/* 4. 공지 상세 내용 조회 */
export function callBoardDetailAPI (boardCode) {

    return async (dispatch, getState) => {

        const result = await request('GET', `/board/${boardCode}`);

        if(result.status == 200) {
            dispatch(getBoardDetail(result));
        }

    }

}

/* 5. 새 공지사항 등록 */
export function callBoardRegistAPI(formData) {

    return async (dispatch, getState) => {

        const headers = {
            "Content-Type": "application/json",
            Authorization: "Bearer " + window.localStorage.getItem("accessToken"),
        };

        const result = await request('POST', `/board/regist`, headers, formData);

        if(result.status == 200) {
            dispatch(postRegistBoard(result));
        }

    }

}

/* 6. 등록된 공지사항 수정 */
export function callBoardModifyAPI(formData) {

    return async (dispatch, getState) => {

        const headers = {
            "Content-Type": "application/json",
        };

        const result = await request('PUT', `/board/modify`, headers, formData);

        if(result.status == 200) {
            dispatch(putModifyBoard(result));
        }

    }

}

/* 7. 등록된 공지사항 삭제 */
export function callBoardRemoveAPI(boardCode) {

    return async (dispatch, getState) => {

        const result = await request('PATCH', `/board/remove/${boardCode}`);

        if(result.status == 200) {
            dispatch(patchRemoveBoard(result));
        }

    }

}

/* 8. 공지사항 조회수 증가 */
export function callBoardCountUpAPI(boardCode) {

    return async (dispatch, getState) => {

        const result = await request('PATCH', `/board/count-up/${boardCode}`);

        if(result.status == 200) {
            dispatch(patchCountUpBoard(result));
        }

    }

}