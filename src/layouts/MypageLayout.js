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
import MypageUpdate from "../components/modal/MypageUpdate";
import CommonCSS from "../css/common/Common.module.css";


function MyPageLayout() {

  const [isAttendanceDocModalOpen, setIsAttendanceDocModalOpen] = useState(false);
  const [isMypageUpdateModalOpen, setIsMypageUpdateModalOpen] = useState(false);
  const { employee } = useSelector(state => state.EmployeeReducer);
  console.log(employee);

  /* 읽기모드와 수정모드를 구분 */
  const [modifyMode, setModifyMode] = useState(false);

  const [form, setForm] = useState({});

  const onClickHandler = () => {
    setIsAttendanceDocModalOpen(true);
  }

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onClickPwdChangeHandler = () => {
    navigate("/pwdchange")
  }

  const onClickPageChange = () => {
    setIsMypageUpdateModalOpen(true);
    setModifyMode(true);
    setForm({ ...employee });


  }

  const onClickHandlerLeaveDoc = () => {
    navigate("/myLeave");
  }

  useEffect(() => {
    dispatch(callGetEmployeeAPI());
  }, [isMypageUpdateModalOpen])

  const closeModal = () => {
    setIsAttendanceDocModalOpen(false);
    setIsMypageUpdateModalOpen(false);

  };

  return (
    <div className={MyPageLayoutCSS.myPageLayoutDiv}>
      <main className={MyPageLayoutCSS.main}>
        <p className={CommonCSS.pageDirection}>마이페이지</p>
        <div className={MyPageLayoutCSS.buttonContainer}>
          <button onClick={onClickPwdChangeHandler} className={MyPageLayoutCSS.button}>비밀번호 변경</button>
          <button onClick={onClickPageChange} className={MyPageLayoutCSS.button}>정보 수정</button>
          <button onClick={onClickHandlerLeaveDoc} className={MyPageLayoutCSS.button}>서류신청목록</button>
          <button onClick={onClickHandler} className={MyPageLayoutCSS.button}>휴가/연차 신청</button>
        </div>
        <Outlet />
        <div className={MyPageLayoutCSS.sub}>
          <div>
            <MyAttendance />
          </div>
        </div>
      </main>
      {isAttendanceDocModalOpen && (

        <AttendanceDocInsert
          closeModal={closeModal}
          employee={employee}
        />
      )}
      {isMypageUpdateModalOpen && (
        <MypageUpdate
          closeModal={closeModal}
          employee={employee}
          modifyMode={modifyMode}
        />
      )}
    </div>
  );
}

export default MyPageLayout;
