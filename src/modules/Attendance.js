import { createActions, handleActions } from "redux-actions";

const initialState = {};

const GET_ATTENDANCE = "attdance/GET_ATTENDANCE";

export const {
    attdance : { getAttendance } } = createActions({
        [GET_ATTENDANCE] : res => res.data
});

const AttendanceReducer = handleActions({
    [GET_ATTENDANCE] : (state , {payload}) => payload
},initialState)

export default AttendanceReducer;
