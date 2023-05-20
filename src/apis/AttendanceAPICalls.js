import { getAttendance, getAttendanceToday, getAttendances, patchAttendance, postAttendance } from "../modules/AttendanceModule";
import { getEmployee, getEmployees } from "../modules/EmployeeModule";
import { request } from "./Api";

const SERVER_IP = `${process.env.REACT_APP_RESTAPI_SERVER_IP}`;
const SERVER_PORT = `${process.env.REACT_APP_RESTAPI_SERVER_PORT}`;
const ATTEN_DANCE = `http://${SERVER_IP}:${SERVER_PORT}/attendance`;

const accessToken = window.localStorage.getItem('accessToken');

export const callEmployee = ({currentPage = 1}) => {

    const requestURL = `${ATTEN_DANCE}/list?page=${currentPage}`;

    return async (dispatch, getState) => {
        const result = await fetch(requestURL,{
            method:'GET'
        }).then(response => response.json());
        if(result.status ===200){
            dispatch(getEmployees(result));
            console.log(result);
        }
    }

}

export const callEmployeeDetail = ({empCode,currentPage = 1}) => {

    const requestURL = `${ATTEN_DANCE}/list-management/${empCode}?page=${currentPage}`

    return async(dispatch,getState)=>{
        const result  = await fetch(requestURL,{
            method : "GET",
            headers : {
                "Content-Type": "application/json",
                Authorization: "Bearer " + window.localStorage.getItem("accessToken"),
            }
        }).then(response => response.json())

        if(result.status ===200){
            dispatch(getAttendances(result));
            console.log(result);
        }

    }
}

export const callLeaveDoc = ({currentPage = 1}) => {
    const requestURL  = `${ATTEN_DANCE}/leave/list?page=${currentPage}`;

    return async (dispatch,getState) => {
        const result = await fetch(requestURL,{
            method : "GET"
        }).then(response => response.json());
        if(result.status === 200){
            dispatch(getAttendance(result));
            console.log(result);
        }
    }
}

export const callLeaveUpdateAPI = (leave) => {
    const requestURL = `${ATTEN_DANCE}/update/${leave.leaveDocCode}`;
  
    return async (dispatch,getState) => {
        const result = await fetch(requestURL,{
            method : 'PATCH',
            headers : {
                "Content-Type": "application/json",
                Authorization: "Bearer " + window.localStorage.getItem("accessToken"),
            },
            body: JSON.stringify(leave)
        }).then(response => response.json());

        if(result.status === 200){
            dispatch(patchAttendance(result));
        }
    }
};

export const callLeaveRegist = (formData) => {
    const requestURL = `${ATTEN_DANCE}/regist`;

    return async (dispatch, getState) => {
        const result = await fetch(requestURL,{
            method : "POST",
            headers : {
                Authorization: "Bearer " + window.localStorage.getItem("accessToken"),
            },
            body: formData
        }).then((response) => response.json())

        if(result.status === 200){
            dispatch(postAttendance(result));
        }
    }
}

/* 오늘의 출퇴근 기록 조회 */
export function callMyAttendanceTodayAPI() {

    return async (dispatch, getState) => {

        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        };

        const result = await request('GET', `/attendance/today`, headers);

        if(result.status == 200) {
            dispatch(getAttendanceToday(result));
        }

    }

}

/* 출근 시각 등록 */

/* 퇴근 시각 등록 */