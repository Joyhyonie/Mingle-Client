import { getCertis } from "../modules/CertiModule";


const SERVER_IP = `${process.env.REACT_APP_RESTAPI_SERVER_IP}`;
const SERVER_PORT = `${process.env.REACT_APP_RESTAPI_SERVER_PORT}`;
const CERTI_URL = `http://${SERVER_IP}:${SERVER_PORT}/certi`;

export const callCertiListAPI = () => {
    const requestURL = `${CERTI_URL}/list`;

    return async (dispatch, getState) => {
        const result = await fetch(requestURL).then(response => response.json());
        if(result.status ===200){
            dispatch(getCertis(result));
        }
    }
}