import { async } from "q";
import { getCertidocname, getCertis, getMycertidocname, patchCerti, postCerti } from "../modules/CertiModule";


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

export const callCertiDocSearchName = ({search, condition ,currentPage = 1}) => {
    const requestURL = `${CERTI_URL}/search?condition=${condition}&search=${search}&page=${currentPage}`;

    return async (dispatch,getState) => {
        const result = await fetch(requestURL).then(response => response.json());

        if(result.status === 200){
            dispatch(getCertidocname(result));
        }
    }
}

export const callMyCertiDocSearchName = ({search, condition ,currentPage = 1}) => {
    const requestURL = `${CERTI_URL}/myCertiDocSearch?condition=${condition}&search=${search}&page=${currentPage}`;

    return async (dispatch,getState) => {
        const result = await fetch(requestURL,{
            method : "GET",
            headers : {
                "Content-Type": "application/json",
                Authorization: "Bearer " + window.localStorage.getItem("accessToken"),
            }
        }).then(response => response.json());

        if(result.status === 200){
            dispatch(getMycertidocname(result));
        }
    }
}

export const callMyCertiDocListAPI = ({currentPage = 1}) => {

    const requestURL = `${CERTI_URL}/myCerti?page=${currentPage}`;

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

export const callRegistCertiDoc = (formData) => {
    const requestURL = `${CERTI_URL}/regist`;

    return async(dispatch,getState) => {
        const result = await fetch(requestURL,{
            method : "POST",
            headers : {
                Authorization: "Bearer " + window.localStorage.getItem("accessToken"),
            },
            body : formData
        }).then((response)=> response.json());

        if(result.status === 200){
            console.log(result);
            dispatch(postCerti(result));
        }
    }
}