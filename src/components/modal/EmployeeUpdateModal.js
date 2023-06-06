import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import EmployeeInsertModalCSS from '../../css/EmployeeInsertModal.module.css';
import { toast } from "react-hot-toast";
import { callEmployeeUpdateAPI, callEmployeeDetailAPI } from "../../apis/AcademicAPICalls";
import { useParams } from 'react-router-dom';

function EmployeeUpdateModal({ setIsEmployeeUpdateModalOpen }) {

  const dispatch = useDispatch();
  const [form, setForm] = useState({});
  const data = useSelector((state) => state.EmployeeReducer);
  const { empCode } = useParams();
  const { modify } = useSelector((state) => state.EmployeeReducer);

  /* 교직원 조회 화면과 수정화면 구분 */
  const [modifyMode, setModifyMode] = useState(false);

  /* 최초 랜더링 시 교직원 상세 정보 조회 */
  useEffect(() => {
    dispatch(callEmployeeDetailAPI({empCode}));
  }, []);


  useEffect(() => {
    if (modify?.status === 200) {
      setIsEmployeeUpdateModalOpen(false);
      toast.success("교직원 정보 상세 수정이 완료 되었습니다.");
    }
  }, [modify]);

  const onChangeHandler = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  /* 수정 모드 변경 이벤트 */
  const onClickModifyModeHandler = () => {
    setModifyMode(true);
    setForm({ ...data });
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  /* 교직원 상세 정보 저장 버튼 클릭 이벤트 */
  const onClickEmployeeUpdateHandler = () => {

    const formData = new FormData();

    formData.append("empCode", form.empCode);
    formData.append("empName", form.empName);
    formData.append("empEnName", form.empEnName);
    formData.append("empAnnual", form.empAnnual);
    formData.append("department.deptCode", form.deptCode);
    formData.append("empSsn", form.empSsn);
    formData.append("empEmail", form.empEmail);
    formData.append("empPwd", form.empPwd);
    formData.append("empPhone", form.empPhone);
    formData.append("empStatus", form.empStatus);
    formData.append("empAddress", form.empAddress);
    formData.append("empEntDate", formatDate(form.empEntDate));
    if(form.empAbDate) {
      formData.append("empAbDate", formatDate(form.empAbDate));
    }
    if(form.empLeaveDate) {
      formData.append("empLeaveDate", formatDate(form.empLeaveDate));
    }

    dispatch(callEmployeeUpdateAPI(formData));
  };



  return (
    <div className={EmployeeInsertModalCSS.EmployeeInsertModal}>
      <div className={EmployeeInsertModalCSS.EmployeeInsertModalContainer}>
        <div className={EmployeeInsertModalCSS.EmployeeInsertModalProfile}>
          <input type="image" src="/images/person.png" />
          <div className={EmployeeInsertModalCSS.EmployeeInsertModalBtn}>
            {!modifyMode && <button onClick={() => setIsEmployeeUpdateModalOpen(false)}>이전</button>}
            {!modifyMode && <button className={EmployeeInsertModalCSS.EmployeeBtnFirst} onClick={onClickModifyModeHandler}>수정</button>}
            { modifyMode && <button className={EmployeeInsertModalCSS.EmployeeBtnFirst} onClick={onClickEmployeeUpdateHandler}>저장</button>}
            { modifyMode && <button className={EmployeeInsertModalCSS.EmployeeBtnSecond} onClick={() => setIsEmployeeUpdateModalOpen(false)}>취소</button>}
          </div>
        </div>
        {data.empCode &&
          <div className={EmployeeInsertModalCSS.EmployeeInsertModalInput}>
            <div className={EmployeeInsertModalCSS.EmployeeInsertModalFirst}>
              이름
              <input
                type="text"
                name="empName"
                className={EmployeeInsertModalCSS.EmployeeInsertModalName}
                onChange={ onChangeHandler }
                value={ !modifyMode ? data.empName : form.empName }
                readOnly={ !modifyMode }
              />
              영문명
              <input
                type="text"
                name="empEnName"
                className={EmployeeInsertModalCSS.EmployeeInsertModalEnName}
                onChange={ onChangeHandler }
                value={ !modifyMode ? data.empEnName : form.empEnName }
                readOnly={ !modifyMode }
              />
              보유연차
              <input
                type="text"
                name="empAnnual"
                className={EmployeeInsertModalCSS.EmployeeInsertModalAnnual}
                onChange={ onChangeHandler }
                value={ !modifyMode ? data.empAnnual : form.empAnnual }
                readOnly={ !modifyMode }
              />
            </div>

            <div className={EmployeeInsertModalCSS.EmployeeInsertModalSecond}>
              소속
              <input
                type="text"
                name="deptCode"
                className={EmployeeInsertModalCSS.EmployeeInsertModalDeptCode}
                onChange={ onChangeHandler }
                value={ !modifyMode ? data.department.deptCode : form.deptCode }
                readOnly={ !modifyMode }
              />
              주민번호
              <input
                type="text"
                name="empSsn"
                className={EmployeeInsertModalCSS.EmployeeInsertModalEmpSsn}
                onChange={onChangeHandler}
                value={ !modifyMode ? data.empSsn : form.empSsn }
                readOnly={ !modifyMode }
              />
            </div>

            <div className={EmployeeInsertModalCSS.EmployeeInsertModalThird}>
              이메일
              <input
                type="text"
                name="empEmail"
                className={EmployeeInsertModalCSS.EmployeeInsertModalEmpEmail}
                onChange={onChangeHandler}
                value={ !modifyMode ? data.empEmail : form.empEmail }
                readOnly={ !modifyMode }
              />
              비밀번호
              <input
                type="password"
                name="empPwd"
                className={EmployeeInsertModalCSS.EmployeeInsertModalEmpPwd}
                onChange={onChangeHandler}
                value={ !modifyMode ? data.empPwd : form.empPwd }
                readOnly={ !modifyMode }
              />
            </div>

            <div className={EmployeeInsertModalCSS.EmployeeInsertModalFourth}>
              전화번호
              <input
                type="tel"
                name="empPhone"
                pattern="[0-1]{3}-[0-9]{4}-[0-9]{4}"
                className={EmployeeInsertModalCSS.EmployeeInsertModalEmpPhone}
                onChange={onChangeHandler}
                value={ !modifyMode ? data.empPhone : form.empPhone }
                readOnly={ !modifyMode }
              />
              상태
              <select name="empStatus" className={EmployeeInsertModalCSS.EmployeeInsertModalEmpStatus} onChange={onChangeHandler}
              value={ !modifyMode ? data.empStatus : form.empStatus } readOnly={ !modifyMode }>
                <option value="재직">재직</option>
                <option value="휴직">휴직</option>
                <option value="안식년">안식년</option>
                <option value="퇴직">퇴직</option>
              </select>
            </div>

            <div className={EmployeeInsertModalCSS.EmployeeInsertModalFifth}>
              주소
              <input
                type="text"
                name="empAddress"
                className={EmployeeInsertModalCSS.EmployeeInsertModalEmpAddress}
                onChange={onChangeHandler}
                value={ !modifyMode ? data.empAddress : form.empAddress }
                readOnly={ !modifyMode }
              />
            </div>

            <div className={EmployeeInsertModalCSS.EmployeeInsertModalSixth}>
              입사일
              <input
                type="date"
                name="empEntDate"
                min="2002-01-01" max="2199-12-31"
                className={EmployeeInsertModalCSS.EmployeeInsertModalEmpEntDate}
                onChange={onChangeHandler}
                value={ !modifyMode ? data.empEntDate : form.empEntDate }
                readOnly={ !modifyMode }
              />
              휴직일
              <input
                type="date"
                name="empAbDate"
                min="2002-01-01" max="2199-12-31"
                className={EmployeeInsertModalCSS.EmployeeInsertModalEmpAbDate}
                onChange={onChangeHandler}
                value={ !modifyMode ? data.empAbDate : form.empAbDate }
                readOnly={ !modifyMode }
              />
              퇴사일
              <input
                type="date"
                name="empLeaveDate"
                min="2002-01-01" max="2199-12-31"
                className={EmployeeInsertModalCSS.EmployeeInsertModalEmpEndDate}
                onChange={onChangeHandler}
                value={ !modifyMode ? data.empLeaveDate : form.empLeaveDate }
                readOnly={ !modifyMode }
              />
            </div>

          </div>
        }

      </div>
    </div>
  )
}

export default EmployeeUpdateModal;