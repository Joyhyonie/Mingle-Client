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
        <h1>마이페이지</h1>
        <span>
          <button onClick={onClickPwdChangeHandler}>비밀번호 변경</button>
          <button onClick={onClickPageChange}>정보 수정</button>
        </span>
        <Outlet />
        <div className={MyPageLayoutCSS.sub}>
          <h1>기간</h1>
          <span>
            <button onClick={onClickHandlerLeaveDoc}>휴가신청서</button>
            <button onClick={onClickHandler}>연차신청</button>
          </span>
          <div>
            <div>
              <MyAttendance />
            </div>
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
