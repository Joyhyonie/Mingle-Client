import { Outlet } from "react-router-dom";
import MyPageLayoutCSS from '../css/MyPageLayout.module.css';
import { useNavigate } from "react-router-dom";
import MyPageAttendance from "../pages/attendance/MyPageAttendance";

import { useDispatch, useSelector } from "react-redux";

import { useEffect, useState } from "react";
import SubjectUpdateModal from "../components/modal/SubjectUpdateModal";
import AttendanceDocInsert from "../components/modal/AttendanceDocInser";
import { getEmployee } from "../modules/EmployeeModule";
import { callGetEmployeeAPI } from "../apis/EmployeeAPICalls";
import MyAttendance from "../components/lists/MyAttendance";


function MyPageLayout() {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const {employee} = useSelector(state => state.EmployeeReducer);
    console.log(employee);

    const onClickHandler = () => {
        setIsModalOpen(true);
    }

    const navigate = useNavigate();
    const dispatch = useDispatch();

   

    const onClickPwdChangeHandler = () => {
        navigate("/pwdchange")    
    }

    const onClickPageChange = () => {
      navigate(`/mypage-update`);
    }

    const onClickHandlerLeaveDoc = () => {
      navigate("/myLeave");
    }

    useEffect(
      ()=>{
        dispatch(callGetEmployeeAPI());
      },
      []
    )




    const closeModal = () => {
        setIsModalOpen(false);
    };
    
    return (

        <div className={ MyPageLayoutCSS.myPageLayoutDiv }>

         
            <main className={ MyPageLayoutCSS.main }>
            <h1>마이페이지</h1>
            <span>
            <button onClick={ onClickPwdChangeHandler } className={ MyPageLayoutCSS.button }>비밀번호 변경</button>
            <button onClick={ onClickPageChange } className={ MyPageLayoutCSS.button }>정보 수정</button>
            </span>
            
                <Outlet/>
                <div className={MyPageLayoutCSS.sub}>
                        <h1>기간</h1>
                        <span>
                              <button onClick={ onClickHandlerLeaveDoc } className={ MyPageLayoutCSS.button }>휴가신청서</button>
                              <button onClick={()=>onClickHandler(employee)} className={ MyPageLayoutCSS.button }>연차신청</button>
                        </span>  
                        <div>
                                <div>
                                  <MyAttendance/>
                                </div>
                            </div>
               </div>
            </main>
            {isModalOpen && (
              
        <AttendanceDocInsert
          closeModal={closeModal}
          employee={employee}
        />
      )}
    </div>




  );
}

export default MyPageLayout;