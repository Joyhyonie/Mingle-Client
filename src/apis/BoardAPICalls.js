import { getBoardPreview } from "../modules/BoardModule";
import { request } from "./Api";

const accessToken = window.localStorage.getItem('accessToken');

export function callBoardPreviewAPI () {

    return async (dispatch, getState) => {

        const headers = {
            'Content-Type': 'application/json'
        };

        const result = await request('GET', `/board/preview`, headers);

        if(result.status == 200) {
            dispatch(getBoardPreview(result));
        }

    }

}