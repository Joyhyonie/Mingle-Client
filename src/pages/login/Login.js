import { useNavigate } from "react-router-dom";
import LoginForm from "../../components/form/LoginForm";
import LoginCSS from '../../css/Login.module.css';
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { resetEmployee } from "../../modules/EmployeeModule";
import { toast } from "react-hot-toast";
import SseConnect from "../../utils/SseConnect";

function Login(){

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { login } = useSelector(state => state.EmployeeReducer);

   useEffect(
    () => {
        if(login?.status === 200) {
            navigate("/", { replace : true });
            dispatch(resetEmployee());
            SseConnect();
        }else if(login?.state === 500){
            toast.error(login.message);
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