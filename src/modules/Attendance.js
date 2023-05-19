import { createActions, handleActions } from "redux-actions";

const initialState = {};

const GET_ATTENDANCES = "attendance/GET_ATTENDANCES";
const GET_ATTENDANCE = "attendance/GET_ATTENDANCE";
const PATCH_ATTENDANCE = "attendance/PATCH_ATTENDANCE";
const POST_ATTENDANCE = 'attendance/POST_ATTENDANCE';

export const {
    attendance : { getAttendances,patchAttendance,getAttendance,postAttendance } } = createActions({
        [GET_ATTENDANCES] : res => res.data,
        [GET_ATTENDANCE] : res => res.data,
        [PATCH_ATTENDANCE] : res => res,
        [POST_ATTENDANCE] : res => res
});

const AttendanceReducer = handleActions({
    [GET_ATTENDANCES] : (state , {payload}) => payload,
    [GET_ATTENDANCE] : (state , {payload}) => ({attendance:payload}),
    [PATCH_ATTENDANCE] : (state , {payload}) => ({patch : payload}),
    [POST_ATTENDANCE] : (state, {payload}) => ({regist : payload})
},initialState)

export default AttendanceReducer;
