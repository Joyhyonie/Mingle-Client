import { getEmployee, postLogin, patchEmployee } from "../modules/EmployeeModule";

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

/* 회원 정보 조회 API  */
export const callGetEmployeeAPI = () => {

    const requestURL = `${PRE_URL}/employee/myemployees`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method : 'GET', 
            headers : {
                "Content-Type" : "application/json",
                "Authorization" : "Bearer " + window.localStorage.getItem('accessToken')
            }
        }).then(response => response.json());

        console.log('[EmployeeAPICalls] callGetEmployeeAPI result : ', result);

        if(result.status === 200 ){
            dispatch(getEmployee(result));
        }
    }
}

export const callPatchEmployeeAPI = (formData) => {
    const requestURL = `${PRE_URL}/employee/putmypage`;

    return async (dispatch, getState) => {
        const headers = new Headers();
        headers.append("Authorization", "Bearer " + window.localStorage.getItem("accessToken"));
        headers.append("Content-Type", `multipart/form-data`); // 수정된 부분
        
        // 추가된 코드: 경계 값을 생성하고 Content-Type 헤더에 추가
        const boundary = generateBoundary();
        headers.append("Content-Type", `multipart/form-data; boundary=${boundary}`);

        const requestOptions = {
            method: 'PATCH',
            headers: headers,
            body: createFormDataBody(formData, boundary) // FormData의 내용과 경계 값을 사용하여 요청 본문 생성
        };

        try {
            const response = await fetch(requestURL, requestOptions);
            const result = await response.json();

            console.log('[content-type] : ', response.headers.get('content-type'));
            console.log('[EmployeeAPICalls] callPatchEmployeeAPI result : ', result);

            if (response.status === 200) {
                dispatch(patchEmployee(result));
            }
        } catch (error) {
            // Handle error
            console.error(error);
        }
    };
};

// 추가된 함수: 경계 값을 생성하는 함수
const generateBoundary = () => {
    return "----WebKitFormBoundary" + Math.random().toString(16).substr(2);
};

// 추가된 함수: FormData의 내용과 경계 값을 사용하여 요청 본문 생성
const createFormDataBody = (formData, boundary) => {
    const body = new FormData();
    for (let key of formData.keys()) {
        body.append(key, formData.get(key));
    }
    return `--${boundary}\r\n` + [...body].map(part => `Content-Disposition: form-data; name="${part[0]}"\r\n\r\n${part[1]}`).join(`\r\n--${boundary}\r\n`) + `\r\n--${boundary}--`;
};




















