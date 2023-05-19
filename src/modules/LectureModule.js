import { createActions, handleActions } from "redux-actions";

/*초기값 */
const initialState = {};

/*액션 */

const GET_SUBJECT_INFO = "lecture/GET_SUBJECT_INFO"

export const { lecture: { getSubjectInfo } } = createActions({
    [GET_SUBJECT_INFO]: (res) => res.data
});

/*리듀서 */
const subjectInfoReducer = handleActions({

    [GET_SUBJECT_INFO]: (state, { payload }) => payload
}, initialState)

export default subjectInfoReducer;