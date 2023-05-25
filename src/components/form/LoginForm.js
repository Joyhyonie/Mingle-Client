import { useState } from "react";
import { useDispatch } from "react-redux";
import { callLoginAPI } from "../../apis/EmployeeAPICalls";
import { useNavigate } from "react-router-dom";


function LoginForm() {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const style ={
        id_title:{
            color:"black",

        },
   
    };
    // 폼 데이터를 한 번에 변경 및 state 저장
    const[form, setForm] = useState({
        empId: '',
        empPwd: ''
    });

    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    }
    
    // 로그인 버튼 클릭 이벤트
    const onClickHandler = () => {
        dispatch(callLoginAPI(form));
    }
    const onClickIdHandler = () => {
        navigate("/idsearch")
    }

    const onClickPwdHandler = () => {
        navigate("/pwdsearch")
    }
    const onKeyPressHandler = (e) => {
        if (e.key === "Enter") {
          onClickHandler();
        }
      };
    
    return (
        <>
            <h1><span id="title">M</span>ingle</h1>
            <span>
            <input
                type="text"
                name="empId"
                placeholder="아이디를 입력하세요."
                autoComplete='off'
                onChange={onChangeHandler}
                onKeyUp={onKeyPressHandler}
            />
            <input
                type="password"
                name="empPwd"
                placeholder="패스워드를 입력하세요."
                autoComplete='off'
                onChange={onChangeHandler}
                onKeyUp={onKeyPressHandler}
            />
            <div>
          <a onClick={ onClickIdHandler }><span style={style.id_title}>아이디 찾기 </span></a>
            <span style={style.id_title} >/</span>
            <a  onClick={ onClickPwdHandler }><span style={style.id_title}> 비밀번호 찾기</span></a>
            </div>
            <button

                onClick={ onClickHandler } 
            >
                Login
            </button>
            </span>
        </>
            );
}

export default LoginForm;