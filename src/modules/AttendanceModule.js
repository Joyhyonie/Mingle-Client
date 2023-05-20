import { createActions, handleActions } from "redux-actions";

const initialState = {};

const GET_ATTENDANCES = "attendance/GET_ATTENDANCES";
const GET_ATTENDANCE = "attendance/GET_ATTENDANCE";
const PATCH_ATTENDANCE = "attendance/PATCH_ATTENDANCE";
const POST_ATTENDANCE = 'attendance/POST_ATTENDANCE';
const GET_ATTENDANCE_TODAY = "attendance/GET_ATTENDANCE_TODAY"
const POST_ATTENDANCE_RECORD = "attendance/POST_ATTENDANCE_RECORD"
const PATCH_ATTENDANCE_RECORD = "attendance/PATCH_ATTENDANCE_RECORD"

export const { attendance : { getAttendances, 
                              patchAttendance, 
                              getAttendance, 
                              postAttendance, 
                              getAttendanceToday,
                              postAttendanceRecord,
                              patchAttendanceRecord } } = createActions({
        [GET_ATTENDANCES] : res => res.data,
        [GET_ATTENDANCE] : res => res.data,
        [PATCH_ATTENDANCE] : res => res,
        [POST_ATTENDANCE] : res => res,
        [GET_ATTENDANCE_TODAY] : res => res.data,
        [POST_ATTENDANCE_RECORD] : res => res,
        [PATCH_ATTENDANCE_RECORD] : res => res,
});

const AttendanceReducer = handleActions({
    [GET_ATTENDANCES] : (state , {payload}) => payload,
    [GET_ATTENDANCE] : (state , {payload}) => ({attendance:payload}),
    [PATCH_ATTENDANCE] : (state , {payload}) => ({patch : payload}),
    [POST_ATTENDANCE] : (state, {payload}) => ({regist : payload}),
    [GET_ATTENDANCE_TODAY] : (state, {payload}) => ({ attendanceToday : payload }),
    [POST_ATTENDANCE_RECORD] : (state, {payload}) => ({ recordStartTime : payload }),
    [PATCH_ATTENDANCE_RECORD] : (state, {payload}) => ({ recordEndTime : payload }),
},initialState)

export default AttendanceReducer;
