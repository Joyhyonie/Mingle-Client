import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import EmployeeInsertModalCSS from '../../css/EmployeeInsertModal.module.css';
import { toast } from "react-hot-toast";
import { callEmployeeInsertAPI } from "../../apis/AcademicAPICalls";

function EmployeeInsertModal({ setIsEmployeeInsertModalOpen }) {

  const dispatch = useDispatch();
  const [form, setForm] = useState({
    empPwd: '1234'
  });
  const { regist } = useSelector((state) => state.EmployeeReducer);

  useEffect(() => {
    if (regist?.status === 200) {
      setIsEmployeeInsertModalOpen(false);
      toast.success("신규 교직원 등록이 완료 되었습니다. 교번은 " + regist.data.empCode + " 입니다.");
    }
  }, [regist]);

  const onChangeHandler = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const onClickEmployeeInsertHandler = () => {

    const formData = new FormData();
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
    if(form.empAbDate) formData.append("empAbDate", formatDate(form.empAbDate));
    if(form.empLeaveDate) formData.append("empLeaveDate", formatDate(form.empLeaveDate));
    console.log('modal form ', form)
    console.log('modal formdata ', formData)

    dispatch(callEmployeeInsertAPI(formData));
  };


  return (
    <div className={EmployeeInsertModalCSS.EmployeeInsertModal}>
      <div className={EmployeeInsertModalCSS.EmployeeInsertModalContainer}>
        <div className={EmployeeInsertModalCSS.EmployeeInsertModalProfile}>
          <input type="image" src="/images/person.png" />
          <div className={EmployeeInsertModalCSS.EmployeeInsertModalBtn}>
            <button className={EmployeeInsertModalCSS.EmployeeBtnFirst} onClick={onClickEmployeeInsertHandler}>등록</button>
            <button className={EmployeeInsertModalCSS.EmployeeBtnSecond} onClick={() => setIsEmployeeInsertModalOpen(false)}>취소</button>
          </div>
        </div>
        <div className={EmployeeInsertModalCSS.EmployeeInsertModalInput}>
          <div className={EmployeeInsertModalCSS.EmployeeInsertModalFirst}>
            이름
            <input
              type="text"
              name="empName"
              className={EmployeeInsertModalCSS.EmployeeInsertModalName}
              onChange={onChangeHandler}
            />
            영문명
            <input
              type="text"
              name="empEnName"
              className={EmployeeInsertModalCSS.EmployeeInsertModalEnName}
              onChange={onChangeHandler}
            />
            보유연차
            <input
              type="text"
              name="empAnnual"
              className={EmployeeInsertModalCSS.EmployeeInsertModalAnnual}
              onChange={onChangeHandler}
            />
          </div>

          <div className={EmployeeInsertModalCSS.EmployeeInsertModalSecond}>
            소속
            <input
              type="text"
              name="deptCode"
              className={EmployeeInsertModalCSS.EmployeeInsertModalDeptCode}
              onChange={onChangeHandler}
            />
            주민번호
            <input
              type="text"
              name="empSsn"
              className={EmployeeInsertModalCSS.EmployeeInsertModalEmpSsn}
              onChange={onChangeHandler}
            />
          </div>

          <div className={EmployeeInsertModalCSS.EmployeeInsertModalThird}>
            이메일
            <input
              type="text"
              name="empEmail"
              className={EmployeeInsertModalCSS.EmployeeInsertModalEmpEmail}
              onChange={onChangeHandler}
            />
            비밀번호
            <input
              type="password"
              name="empPwd"
              className={EmployeeInsertModalCSS.EmployeeInsertModalEmpPwd}
              onChange={onChangeHandler}
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
            />
            상태
            <select name="empStatus" className={EmployeeInsertModalCSS.EmployeeInsertModalEmpStatus} onChange={onChangeHandler}>
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
            />
            휴직일
            <input
              type="date"
              name="empAbDate"
              min="2002-01-01" max="2199-12-31"
              className={EmployeeInsertModalCSS.EmployeeInsertModalEmpAbDate}
              onChange={onChangeHandler}
            />
            퇴사일
            <input
              type="date"
              name="empLeaveDate"
              min="2002-01-01" max="2199-12-31"
              className={EmployeeInsertModalCSS.EmployeeInsertModalEmpEndDate}
              onChange={onChangeHandler}
            />
          </div>

        </div>

      </div>
    </div>
  )
}

export default EmployeeInsertModal;