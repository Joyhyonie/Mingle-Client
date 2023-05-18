import { useNavigate } from "react-router-dom";
import LoginForm from "../../components/form/LoginForm";
import LoginCSS from '../../css/Login.module.css';
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { resetEmployee } from "../../modules/EmployeeModule";

function Login(){

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { login } = useSelector(state => state.employeeReducer);

   useEffect(
    () => {
        if(login?.status === 200) {
            navigate("/", { replace : true });
            dispatch(resetEmployee());
        }else if(login?.state === 500){
            alert(login.message);
            dispatch(resetEmployee());
        }
    },
    [login]
   );


    return (
        <div>
             <div className={ LoginCSS.backgroundDiv }>
            <div className={ LoginCSS.loginDiv }>
                <LoginForm/>
                
            </div>
        </div>
        </div>
    );
}

export default Login;