import { createActions, handleActions } from "redux-actions";

/*초기값 */
const initialState = {};

/*액션 */

const GET_MYLECTURE = 'lecture/GET_MYLECTURE';
const GET_MYLECTURE_CERTI = 'lecture/GET_MYLECTURE_CERTI';
const GET_LECNAME_MYLECTURE = 'lecture/GET_LECNAME_MYLECTURE';
const GET_SUBJECT_INFO = "lecture/GET_SUBJECT_INFO"
const GET_LECTURE_INFO = "lecture/GET_LECTURE_INFO"
const GET_ATTENDANCELIST_INFO = "lecture/GET_ATTENDANCE_LIST_INFO"
const GET_NEW_ATTENDANCELIST_INFO = "lecture/GET_NEW_ATTENDANCELIST_INFO"
const GET_LECTURE_COUNT = "lecture/GET_LECTURE_COUNT"
const PATCH_LEC_PLAN = "lecture/PATCH_LEC_PLAN";

export const { lecture:
    { getSubjectInfo, getLectureInfo, getMylecture, getAttendanceListInfo, getNewAttendancelistInfo,getLecnameMylecture,getMylectureCerti, patchLecPlan } } = createActions({

        [GET_SUBJECT_INFO]: (res) => res.data, //액션이 발생할댸 => res라는 값이 넘어어올때 res.data를 꺼내기 
        [GET_LECTURE_INFO]: (res) => res.data,
        [GET_MYLECTURE_CERTI] : res => res.data,
        [GET_LECNAME_MYLECTURE] : (res) => res.data,
        [GET_MYLECTURE]: res => res.data,
        [GET_ATTENDANCELIST_INFO]: (res) => res.data,
        [GET_NEW_ATTENDANCELIST_INFO]: (res) => res.data,
        [GET_LECTURE_COUNT]: (res) => res.data,
        [PATCH_LEC_PLAN]: (res) => res.data


    });

/*리듀서  res.data 이값이 payload로 있는것 */
const SubjectInfoReducer = handleActions({

    [GET_SUBJECT_INFO]: (state, { payload }) => payload,
    [GET_MYLECTURE_CERTI] : (state, {payload}) => ({myLectureCerti : payload}),
    [GET_LECTURE_INFO]: (state, { payload }) => payload,
    [GET_ATTENDANCELIST_INFO]: (state, { payload }) => ({ attendance: payload }),
    [GET_LECNAME_MYLECTURE] : (state, {payload}) => ({lecName : payload}),
    [GET_MYLECTURE]: (state, { payload }) => ({ myLecture: payload }),
    [GET_NEW_ATTENDANCELIST_INFO]: (state, { payload }) => ({ newAttendance: payload }),
    [GET_LECTURE_COUNT]: (state, { payload }) => ({ lecCount: payload }),
    [PATCH_LEC_PLAN]: (state, {payload}) => payload


}, initialState)

export default SubjectInfoReducer;