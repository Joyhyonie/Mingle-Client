import { async } from "q";
import { getCertis, patchCerti, putCerti } from "../modules/CertiModule";


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

export const callCertiUpdateAPI = (certi) => {
    const requestURL = `${CERTI_URL}/update/${certi.certiDocCode}`;
  
    return async (dispatch,getState) => {
        const result = await fetch(requestURL,{
            method : 'PATCH',
            headers : {
                "Content-Type": "application/json",
                Authorization: "Bearer " + window.localStorage.getItem("accessToken"),
            },
            body: JSON.stringify(certi)
        }).then(response => response.json());

        if(result.status === 200){
            dispatch(patchCerti(result));
        }
    }
};

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

export const callDetailCertiDoc = (myCerti) => {

    const requestURL = `${CERTI_URL}/myCerti/${myCerti.certiDocCode}`;

    return async(dispatch,getState) => {
        const result = await fetch(requestURL,{
            method : "GET"
        }).then(response => response.json());

        if(result.status === 200){
            dispatch(getCertis(result));
            console.log(result);
        }
    }
}