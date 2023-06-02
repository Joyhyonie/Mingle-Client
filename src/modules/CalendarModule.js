import { createActions, handleActions } from "redux-actions";

/* 초기값 */
const initialState = {
    dateInMyCal: new Date(),
    filteredMySchedule: [],
    dateInAcCal: new Date(),
    filteredAcSchedule: []
};

/* 액션 */
const SET_DATE_IN_MY_CAL = "calendar/SET_DATE_IN_MY_CAL";
const SET_FILTERED_MY_SCHEDULE  = "calendar/SET_FILTERED_MY_SCHEDULE";
const SET_DATE_IN_AC_CAL = "calendar/SET_DATE_IN_AC_CAL";
const SET_FILTERED_AC_SCHEDULE  = "calendar/SET_FILTERED_AC_SCHEDULE";

export const { calendar : { setDateInMyCal, setFilteredMySchedule, setDateInAcCal, setFilteredAcSchedule } } = createActions({
    [SET_DATE_IN_MY_CAL] : date => date,
    [SET_FILTERED_MY_SCHEDULE] : schedule => schedule,
    [SET_DATE_IN_AC_CAL] : date => date,
    [SET_FILTERED_AC_SCHEDULE] : schedule => schedule
})

/* 리듀서 */
const CalendarReducer = handleActions(
    {
        [SET_DATE_IN_MY_CAL] : (state, { payload }) => ({ ...state, dateInMyCal: payload, }),
        [SET_FILTERED_MY_SCHEDULE] : (state, { payload }) => ({ ...state, filteredMySchedule: payload }),
        [SET_DATE_IN_AC_CAL] : (state, { payload }) => ({ ...state, dateInAcCal: payload, }),
        [SET_FILTERED_AC_SCHEDULE] : (state, { payload }) => ({ ...state, filteredAcSchedule: payload })
    }
, initialState);

export default CalendarReducer;