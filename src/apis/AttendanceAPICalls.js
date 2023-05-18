import { getAttendance } from "../modules/Attendance";
import { getEmployees } from "../modules/EmployeeModule";

const SERVER_IP = `${process.env.REACT_APP_RESTAPI_SERVER_IP}`;
const SERVER_PORT = `${process.env.REACT_APP_RESTAPI_SERVER_PORT}`;
const ATTEN_DANCE = `http://${SERVER_IP}:${SERVER_PORT}/attendance`;

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
            dispatch(getAttendance(result));
            console.log(result);
        }

    }
}