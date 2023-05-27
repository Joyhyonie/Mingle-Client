import { createActions, handleActions } from "redux-actions";

/*초기값 */
const initialState = {};

/*액션 */

const GET_SUBJECT_INFO = "lecture/GET_SUBJECT_INFO"
const GET_LECTURE_INFO = "lecture/GET_LECTURE_INFO"
const GET_ATTENDANCELIST_INFO = "lecture/GET_ATTENDANCE_LIST_INFO"

export const { lecture:
    { getSubjectInfo, getLectureInfo, getAttendanceListInfo } } = createActions({
        [GET_SUBJECT_INFO]: (res) => res.data, //액션이 발생할댸 => res라는 값이 넘어어올때 res.data를 꺼내기 
        [GET_LECTURE_INFO]: (res) => res.data,
        [GET_ATTENDANCELIST_INFO]: (res) => res.data
    });

/*리듀서  res.data 이값이 payload로 있는것 */
const SubjectInfoReducer = handleActions({

    [GET_SUBJECT_INFO]: (state, { payload }) => payload,
    [GET_LECTURE_INFO]: (state, { payload }) => payload,
    [GET_ATTENDANCELIST_INFO]: (state, { payload }) => ({ attendance: payload })
}, initialState)

export default SubjectInfoReducer;