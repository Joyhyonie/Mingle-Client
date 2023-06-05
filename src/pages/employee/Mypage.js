import { useDispatch, useSelector } from 'react-redux';
import MypageCSS from '../../css/Mypage.module.css';
import { useEffect } from 'react';
import { callGetEmployeeAPI } from '../../apis/EmployeeAPICalls';
import { toast } from 'react-hot-toast';

function Mypage() {
  const dispatch = useDispatch();
  const { employee } = useSelector(state => state.EmployeeReducer);

  useEffect(() => {
    dispatch(callGetEmployeeAPI());
  }, [dispatch]);


  return (
    <div className={MypageCSS.backgroundDiv} style={{ backgroundColor: 'white' }}>
      {employee && (
        <div className={MypageCSS.registerDiv}>
          <img src={employee.empProfile} alt="" />
          <div className={MypageCSS.row}>
            <div className={MypageCSS.column2}>
              <div className={MypageCSS.namebar}>
                <label>이름</label>
                <input type="text" readOnly value={employee.empName} />
              </div>
              <div className={MypageCSS.Enamebar}>
                <label>영문명</label>
                <input type="text" readOnly value={employee.empNameEn} />
              </div>
            </div>
            <div className={MypageCSS.column}>
              <label htmlFor="employeeName">메일</label>
              <input id="employeeName" type="text" readOnly value={employee.empEmail} />
            </div>
            <div className={MypageCSS.column}>
              <label htmlFor="employeeEmail">번호</label>
              <input id="employeeEmail" type="text" readOnly value={employee.empPhone} />
            </div>
            <div className={MypageCSS.column}>
              <label htmlFor="employeeEmail">주소</label>
              <input id="employeeEmail" type="text" readOnly value={employee.empAddress} />
            </div>
            <div className={MypageCSS.column3}>
              <input id="employeeEmail" type="text" readOnly value={employee.employeeEmail} />
            </div>
          </div>
          <div className={MypageCSS.row1}>
            <div className={MypageCSS.column}>
              <label>교번</label>
              <input type="text" readOnly value={employee.empCode} />
            </div>
            <div className={MypageCSS.column}>
              <label htmlFor="employeeName">상태</label>
              <input id="employeeName" type="text" readOnly value={employee.empStatus} />
            </div>
            <div className={MypageCSS.column}>
              <label htmlFor="employeeEmail">입사</label>
              <input
                id="employeeEmail"
                type="text"
                readOnly
                value={employee.empEntDate?.substring(0, 10)}
              />
            </div>
            <div className={MypageCSS.column}>
              <label htmlFor="employeeEmail">소속</label>
              <input id="employeeEmail" type="text" readOnly value={employee.department.deptName} />
            </div>
            <div className={MypageCSS.column}>
              <label htmlFor="employeeEmail">연차</label>
              <input id="employeeEmail" type="text" readOnly value={employee.empAnnual} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Mypage;