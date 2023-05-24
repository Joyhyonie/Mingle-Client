import { createActions, handleActions } from "redux-actions";

const initialState = {};

const GET_ATTENDANCES = "attendance/GET_ATTENDANCES";
const GET_ATTENDANCE = "attendance/GET_ATTENDANCE";
const PATCH_ATTENDANCE = "attendance/PATCH_ATTENDANCE";
const POST_ATTENDANCE = 'attendance/POST_ATTENDANCE';
const GET_ATTENDANCE_TODAY = "attendance/GET_ATTENDANCE_TODAY"
const POST_ATTENDANCE_RECORD = "attendance/POST_ATTENDANCE_RECORD"
const PATCH_ATTENDANCE_RECORD = "attendance/PATCH_ATTENDANCE_RECORD"
const GET_MYATTENDANCE = "attendance/GET_MYATTENDANCE";
const GET_MYLEAVE = "attendance/GET_MYLEAVE";
const PATCH_ADMINATTENDANCE = "attendance/PATCH_ADMINATTENDANCE"
const GET_LEAVESEARCHNAME = "attendance/GET_LEAVESEARCHNAME";
const GET_MYLEAVESEARCHNAME = "attendance/GET_MYLEAVESEARCHNAME";

export const { attendance : { getAttendances, 
                              patchAttendance, 
                              getAttendance, 
                              postAttendance, 
                              getAttendanceToday,
                              postAttendanceRecord,
                              patchAttendanceRecord,
                              getMyattendance,
                              getMyleave,
                              patchAdminattendance,
                              getLeavesearchname,
                              getMyleavesearchname} } = createActions({
        [GET_ATTENDANCES] : res => res.data,
        [GET_ATTENDANCE] : res => res.data,
        [PATCH_ATTENDANCE] : res => res,
        [POST_ATTENDANCE] : res => res,
        [GET_ATTENDANCE_TODAY] : res => res.data,
        [POST_ATTENDANCE_RECORD] : res => res,
        [PATCH_ATTENDANCE_RECORD] : res => res,
        [GET_MYATTENDANCE] : res => res.data,
        [GET_MYLEAVE] : res => res.data,
        [PATCH_ADMINATTENDANCE] : res => res,
        [GET_LEAVESEARCHNAME] : res => res.data,
        [GET_MYLEAVESEARCHNAME] : res => res.data
});

const AttendanceReducer = handleActions({
    [GET_ATTENDANCES] : (state , {payload}) => payload,
    [GET_ATTENDANCE] : (state , {payload}) => ({attendance:payload}),
    [PATCH_ATTENDANCE] : (state , {payload}) => ({patch : payload}),
    [POST_ATTENDANCE] : (state, {payload}) => ({regist : payload}),
    [GET_ATTENDANCE_TODAY] : (state, {payload}) => ({ attendanceToday : payload }),
    [POST_ATTENDANCE_RECORD] : (state, {payload}) => ({ recordStartTime : payload }),
    [PATCH_ATTENDANCE_RECORD] : (state, {payload}) => ({ recordEndTime : payload }),
    [GET_MYATTENDANCE] : (state, {payload}) => payload,
    [GET_MYLEAVE] : (state, {payload}) => ({myleave: payload}),
    [PATCH_ADMINATTENDANCE] : (state, {payload}) => ({adminpatch : payload}),
    [GET_LEAVESEARCHNAME] : (state, {payload}) => ({searchName: payload}),
    [GET_MYLEAVESEARCHNAME] : (state, {payload}) => ({searchMyLeaveDoc : payload})
},initialState)

export default AttendanceReducer;
