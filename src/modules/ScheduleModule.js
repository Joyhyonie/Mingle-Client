import { createActions, handleActions } from "redux-actions";

/* 초기값 */
const initalState = [];

/* 액션 */
const GET_ALL_MY_SCHEDULE = "schedule/GET_ALL_MY_SCHEDULE";
const GET_MY_SCHEDULE = "schedule/GET_MY_SCHEDULE";
const PATCH_MY_SCHEDULE_CHECK = "schedule/PATCH_MY_SCHEDULE_CHECK";
const POST_MY_SCHEDULE = "schedule/POST_MY_SCHEDULE";
const PUT_MY_SCHEDULE = "schedule/PUT_MY_SCHEDULE";
const DELETE_MY_SCHEDULE = "schedule/DELETE_MY_SCHEDULE";
const GET_ALL_AC_SCHEDULE = "schedule/GET_ALL_AC_SCHEDULE";
const GET_AC_SCHEDULE = "schedule/GET_AC_SCHEDULE";

export const { schedule : { getAllMySchedule, 
                            getMySchedule, 
                            patchMyScheduleCheck, 
                            postMySchedule,
                            putMySchedule,
                            deleteMySchedule,
                            getAllAcSchedule,
                            getAcSchedule } } = createActions({
    [GET_ALL_MY_SCHEDULE] : (res) => res.data,
    [GET_MY_SCHEDULE] : (res) => res.data,
    [PATCH_MY_SCHEDULE_CHECK] : (res) => res,
    [POST_MY_SCHEDULE] : (res) => res,
    [PUT_MY_SCHEDULE] : (res) => res,
    [DELETE_MY_SCHEDULE] : (res) => res,
    [GET_ALL_AC_SCHEDULE] : (res) => res.data,
    [GET_AC_SCHEDULE] : (res) => res.data,
})

/* 리듀서 */
const ScheduleReducer = handleActions(
    {
        [GET_ALL_MY_SCHEDULE] : (state, { payload }) => ({ allMySchedule : payload }),
        [GET_MY_SCHEDULE] : (state, { payload }) => ({ mySchedule : payload }),
        [PATCH_MY_SCHEDULE_CHECK] : (state, { payload }) => ({ checkSchedule : payload }),
        [POST_MY_SCHEDULE] : (state, { payload }) => ({ registMySche : payload }),
        [PUT_MY_SCHEDULE] : (state, { payload }) => ({ modifyMySche : payload }),
        [DELETE_MY_SCHEDULE] : (state, { payload }) => ({ removeMySche : payload }),
        [GET_ALL_AC_SCHEDULE] : (state, { payload }) => ({ allAcSchedule : payload }),
        [GET_AC_SCHEDULE] : (state, { payload }) => ({ acSchedule : payload }),
    }
, initalState);

export default ScheduleReducer;
