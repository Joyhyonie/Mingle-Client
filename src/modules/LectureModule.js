import { createActions, handleActions } from "redux-actions";

/*초기값 */
const initialState = {};

/*액션 */

const GET_MYLECTURE = 'lecture/GET_MYLECTURE';
const GET_MYLECTURE_CERTI = 'lecture/GET_MYLECTURE_CERTI';
const GET_SEARCH_NAME = 'lecture/GET_SEARCH_NAME';
const GET_LECNAME_MYLECTURE = 'lecture/GET_LECNAME_MYLECTURE';
const GET_SUBJECT_INFO = "lecture/GET_SUBJECT_INFO"
const GET_LECTURE_INFO = "lecture/GET_LECTURE_INFO"
const GET_OPEN_LECTURE_INFO = "lecture/GET_OPEN_LECTURE_INFO"
const GET_ATTENDANCELIST_INFO = "lecture/GET_ATTENDANCE_LIST_INFO"
const GET_NEW_ATTENDANCELIST_INFO = "lecture/GET_NEW_ATTENDANCELIST_INFO"
const GET_LECTURE_COUNT = "lecture/GET_LECTURE_COUNT"
const PATCH_LEC_PLAN = "lecture/PATCH_LEC_PLAN";
const PATCH_ATTENDANCELIST_MODIFY = "lecture/PATCH_STDATTENDANCE_MODIFY"
const INIT_MODIFY = "lecture/INIT_MODIFY"
const GET_LECTURE_SEARCH = "lecture/GET_LECTURE_SEARCH"
const GET_OPEN_LECTURE_SEARCH = "lecture/GET_OPEN_LECTURE_SEARCH"




const GET_STUDENT_ATTENDANCE = "lecture/GET_STUDENT_ATTENDANCE";

export const { lecture: { getSubjectInfo,
    getLectureInfo,
    getMylecture,
    getLectureSearch,
    getOpenLectureInfo,
    getOpenLectureSearch,
    getAttendanceListInfo,
    patchStdattendanceModify,
    getNewAttendancelistInfo,
    initModify,
    getLectureCount,
    getLecnameMylecture,
    getMylectureCerti,
    getSearchName,
    patchLecPlan,
    getStudentAttendance } } = createActions({




        [GET_SUBJECT_INFO]: (res) => res.data, //액션이 발생할댸 => res라는 값이 넘어어올때 res.data를 꺼내기 
        [GET_LECTURE_INFO]: (res) => res.data,
        [GET_OPEN_LECTURE_INFO]: (res) => res.data,
        [GET_MYLECTURE_CERTI]: res => res.data,
        [GET_LECNAME_MYLECTURE]: (res) => res.data,
        [GET_MYLECTURE]: res => res.data,
        [GET_ATTENDANCELIST_INFO]: (res) => res.data,
        [GET_NEW_ATTENDANCELIST_INFO]: (res) => res.data,
        [GET_LECTURE_COUNT]: (res) => res.data,
        [GET_LECTURE_SEARCH]: res => res.data,
        [GET_OPEN_LECTURE_SEARCH]: res => res.data,

        [INIT_MODIFY]: () => { },

        [PATCH_LEC_PLAN]: res => res,
        [PATCH_ATTENDANCELIST_MODIFY]: (res) => res,

        [GET_SEARCH_NAME]: res => res.data,
        [GET_STUDENT_ATTENDANCE]: res => res.data

    });

/*리듀서  res.data 이값이 payload로 있는것 */
const SubjectInfoReducer = handleActions({

    [GET_SUBJECT_INFO]: (state, { payload }) => payload,
    [GET_MYLECTURE_CERTI]: (state, { payload }) => ({ myLectureCerti: payload }),
    [GET_LECTURE_INFO]: (state, { payload }) => payload,
    [GET_ATTENDANCELIST_INFO]: (state, { payload }) => ({ ...state, attendance: payload }),
    [GET_LECNAME_MYLECTURE]: (state, { payload }) => ({ lecName: payload }),
    [GET_MYLECTURE]: (state, { payload }) => ({ myLecture: payload }),
    [GET_NEW_ATTENDANCELIST_INFO]: (state, { payload }) => ({ ...state, newAttendance: payload }),
    [GET_LECTURE_COUNT]: (state, { payload }) => ({ lecCount: payload }),
    [PATCH_ATTENDANCELIST_MODIFY]: (state, { payload }) => ({ ...state, modify: payload }),


    [INIT_MODIFY]: (state, { payload }) => ({ ...state, modify: null }),
    [GET_LECTURE_SEARCH]: (state, { payload }) => ({ ...state, search: payload }),
    [GET_OPEN_LECTURE_INFO]: (state, { payload }) => payload,
    [GET_OPEN_LECTURE_SEARCH]: (state, { payload }) => ({ openSearch: payload }),
    [GET_SEARCH_NAME]: (state, { payload }) => ({ searchName: payload }),
    [PATCH_LEC_PLAN]: (state, { payload }) => ({ lecplan: payload }),
    [GET_STUDENT_ATTENDANCE]: (state, { payload }) => ({ ...state, stdAttendance: payload })


}, initialState)

export default SubjectInfoReducer;