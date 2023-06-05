import { toast } from "react-hot-toast";
import { getEmployee, postLogin, patchEmployee, postId, postPwd, postPwdchange, resetEmployee } from "../modules/EmployeeModule";
import { useNavigate } from "react-router-dom";


const SERVER_IP = `${process.env.REACT_APP_RESTAPI_SERVER_IP}`;
const SERVER_PORT = `${process.env.REACT_APP_RESTAPI_SERVER_PORT}`;
const PRE_URL = `http://${SERVER_IP}:${SERVER_PORT}`;


/* 로그인 API 호출 */
export const callLoginAPI = (form) => {

    const requestURL = `${PRE_URL}/auth/login`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(form)
        })
            .then(response => response.json());

        console.log('[EmployeeCalls] callLoginAPI result : ', result);

        if (result.status === 200) {
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
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + window.localStorage.getItem('accessToken')
            }
        }).then(response => response.json());

        console.log('[EmployeeAPICalls] callGetEmployeeAPI result : ', result);

        if (result.status === 200) {
            dispatch(getEmployee(result));
        }
    }
}

export const callPatchEmployeeAPI = (formData) => {
    const requestURL = `${PRE_URL}/employee/putmypage`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL,{
            method : 'PATCH',
            headers : {
                "Authorization" : "Bearer " + window.localStorage.getItem('accessToken')

            },
            body : formData
        }).then(response => response.json());

        if(result.status === 200){
            console.log('[ProductAPICalls] callProductUpdateAPI Result :', result);
            dispatch(patchEmployee(result));
        }
    }
}

export const callIdAPI = (form) => {

    const requestURL = `${PRE_URL}/auth/idsearch`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(form)
        })
            .then(response => response.json());

            if( result.status === 200){
        console.log('[EmployeeCalls] callIdAPI result : ', result);
              dispatch(postId(result));
              return result;
              
        }else{
            toast.error("입력하신 정보와 일치하는 아이디가 존재하지 않습니다.");
        }

        
        
    };
};


export const callPwdAPI = (form) => {
    const requestURL = `${PRE_URL}/auth/sendemail`;
  
    return async (dispatch) => {
      try {
        const result = await fetch(requestURL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(form)
        })
        .then(response => response.json());
  
        if ( result.status === 200) {
          console.log('[EmployeeCalls] callPwdAPI result:', result);
          dispatch(resetEmployee());
          // postPwd 액션 디스패치
          toast.success(result.message);
          dispatch(resetEmployee());
          return result;
        } else {
          toast.error("해당 아이디와 일치하는 사용자가 없습니다.");
        }
      } catch (error) {
        console.error('An error occurred:', error);
        toast.error('요청을 처리하는 중에 오류가 발생했습니다.');
      }
    };
  };
  


export const callPwdChangeAPI = (form) => {
    const requestURL = `${PRE_URL}/auth/pwdChange`;
  
    return async (dispatch, getState) => {
      try {
        const result = await fetch(requestURL, {
          method: 'POST',
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + window.localStorage.getItem('accessToken')
          },
          body: JSON.stringify(form)
        }).then(response => response.json());
  
        if (result.status === 200) {
          console.log('[EmployeeCalls] callPwdChangeAPI result : ', result);
          // 성공 메시지 처리
          toast.success(result.message); // 또는 다른 방식으로 메시지 표시
        } else {
          // 실패 메시지 처리
          toast.error(result.message); // 또는 다른 방식으로 메시지 표시
        }
      } catch (error) {
        // 예기치 못한 오류 처리
        console.error('An error occurred:', error);
        toast.error('요청을 처리하는 중에 오류가 발생했습니다.');
      }
    };
  };






