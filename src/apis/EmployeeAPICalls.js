import { getEmployee, postLogin } from "../modules/EmployeeModule";

const SERVER_IP = `${process.env.REACT_APP_RESTAPI_SERVER_IP}`;
const SERVER_PORT = `${process.env.REACT_APP_RESTAPI_SERVER_PORT}`;
const PRE_URL = `http://${SERVER_IP}:${SERVER_PORT}`;

/* 로그인 API 호출 */
export const callLoginAPI = (form) => {

    const requestURL = `${PRE_URL}/auth/login`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify(form)
        })
        .then(response => response.json());

        console.log('[EmployeeCalls] callLoginAPI result : ', result);

        if(result.status === 200) {
            /* 로그인 성공 시 발급 받은 accessToken을 클라이언트 측의 localStorage에 저장한다. 
            이후 토큰이 필요한 요청에는 저장 된 토큰을 넣어 요청하도록 한다. */
            window.localStorage.setItem('accessToken', result.data.accessToken);
        }
        
        dispatch(postLogin(result));
    }
}


























