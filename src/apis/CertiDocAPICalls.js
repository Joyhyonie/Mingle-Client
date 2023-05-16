import { async } from "q";
import { getCertis, putCerti } from "../modules/CertiModule";


const SERVER_IP = `${process.env.REACT_APP_RESTAPI_SERVER_IP}`;
const SERVER_PORT = `${process.env.REACT_APP_RESTAPI_SERVER_PORT}`;
const CERTI_URL = `http://${SERVER_IP}:${SERVER_PORT}/certi`;

export const callCertiListAPI = () => {
    const requestURL = `${CERTI_URL}/list`;

    return async (dispatch, getState) => {
        const result = await fetch(requestURL,{
            method:'GET'
        }).then(response => response.json());
        if(result.status ===200){
            dispatch(getCertis(result));
        }
    }
}

export const callCertiUpdateAPI = (formData) => {

    const requestURL = `${CERTI_URL}/update`;

    return async (dispatch,getState) => {
        const result = await fetch(requestURL,{
            method : 'PUT',
            body : formData
        }).then(response => response.json());

        if(result.status === 200){
            dispatch(putCerti(result));
            console.log(result);
        }
    }

}

export const callMyCertiDocListAPI = () => {

    const requestURL = `${CERTI_URL}/myCerti`;

    return async (dispatch,getState) => {
        const result = await fetch(requestURL,{
            method : "GET",
            headers : {
                "Content-Type": "application/json",
                Authorization: "Bearer " + window.localStorage.getItem("accessToken"),
            },
        }).then(response => response.json());

        if(result.status === 200){
            dispatch(getCertis(result));
            console.log(result);
        }
    }

}