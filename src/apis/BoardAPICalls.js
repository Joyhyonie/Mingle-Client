import { getBoardList, getBoardPreview } from "../modules/BoardModule";
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