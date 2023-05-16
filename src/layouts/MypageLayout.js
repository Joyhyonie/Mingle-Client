import { Outlet } from "react-router-dom";
import MyPageLayoutCSS from '../css/MyPageLayout.module.css';
import { useNavigate } from "react-router-dom";
import MyPageAttendance from "../pages/attendance/MyPageAttendance";

function MyPageLayout() {
    const navigate = useNavigate();

    const onClickPwdChangeHandler = () => {
        navigate("/pwdchange")
    }
    return (
        <div className={ MyPageLayoutCSS.myPageLayoutDiv }>

         
            <main className={ MyPageLayoutCSS.main }>
            <h1>마이페이지</h1>
            <span>
            <button onClick={ onClickPwdChangeHandler } >비밀번호 변경</button>
            <button onClick={ onClickPwdChangeHandler } >정보 수정</button>
            </span>
            
                <Outlet/>
                <div className={MyPageLayoutCSS.sub}>
                        <h1>기간</h1>
                        <span>
                              <button>연차신청</button>
                        </span>  
                        <div>
                                <div>
                                  <MyPageAttendance/>
                                </div>
                            </div>
               </div>
            </main>
                          
        </div>




    );
}

export default MyPageLayout;