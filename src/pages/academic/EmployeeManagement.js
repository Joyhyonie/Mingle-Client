/* 행정직원의 '교직원 관리' */
import { motion } from "framer-motion";
import { useEffect, useState } from 'react';
import { callEmployeesAPI, callEmployeesDeleteAPI, callEmployeeSearchListAPI } from '../../apis/AcademicAPICalls';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import SearchBar from '../../components/common/SearchBar';
import SearchBarCss from '../../css/common/SearchBar.module.css';
import EmployeeListCss from '../../css/EmployeeList.module.css';
import CommonCSS from '../../css/common/Common.module.css';
import PagingBar from '../../components/common/PagingBar';

const options = [
  { value: 'empName', label: '직원명' },
  { value: 'deptName', label: '소속명' },
];

function EmployeeManagement() {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { Employees, search } = useSelector((state) => state.StaffReducer);
  const [currentPage, setCurrentPage] = useState(1);

  // checkbox
  const [selectAll, setSelectAll] = useState(false);
  const [checkboxes, setCheckboxes] = useState({});
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  // search
  const [params] = useSearchParams();
  const condition = params.get('condition');
  const name = params.get('search');
  const type = "employee";
  

  useEffect(
    () => {
      if (name) {
        dispatch(callEmployeeSearchListAPI({ search: name, condition: condition, currentPage: currentPage }))
        return;
      }
      dispatch(callEmployeesAPI({ currentPage }))
    },
    [currentPage, condition, name]
  );

  /* 교직원 테이블 항목 클릭 이벤트 */
  const onEmployeeItemClickHandler = async (empCode) => {
    navigate(`/modify-employee/${empCode}`);
  }

  /* 교직원 체크박스 클릭과 테이블 항목 클릭 이벤트 버블링 중지 이벤트 */
  const handleCheckboxClick = (e) => {
    e.stopPropagation();
  };


  // 각 교직원의 체크박스
  const handleCheckboxChange = (e, empCode) => {
    const newCheckboxes = {
      ...checkboxes,
      [empCode]: e.target.checked
    };
    setCheckboxes(newCheckboxes);

    const allSelected = Object.values(newCheckboxes).every(val => val === true);
    setSelectAll(allSelected);
  };


  // 모두 선택
  const handleSelectAll = (e) => {
    // 체크 해제
    setSelectAll(e.target.checked);

    // 체크박스 상태 통일(전체)
    let newCheckboxes = {};
    Employees.data.forEach((staff) => {
      newCheckboxes[staff.empCode] = e.target.checked;
    });
    setCheckboxes(newCheckboxes);
  };

  // onClickEmployeeInsert
  const onClickEmployeeInsert = () => {
    navigate("/regist-employee");
  }

  // onClickEmployeeDelete
  const onClickEmployeeDelete =
    async () => {
      const selectedEmpCodes =
        Object.keys(checkboxes).filter((empCode) => checkboxes[empCode]);
      if (selectedEmpCodes.length > 0) {
        await dispatch(callEmployeesDeleteAPI(selectedEmpCodes));
        // 선택한 체크박스 초기화
        setCheckboxes({});
        // 교직원 목록 갱신
        dispatch(callEmployeesAPI({ currentPage }));
        toast.success("교직원 정보가 성공적으로 삭제 되었습니다.");
      } else {
        toast.error("지우고자 하는 교직원 정보를 선택해 주세요!");
      }
    };



  return (
    <motion.div
      className={EmployeeListCss.EmployeeList}
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ ease: "easeOut", duration: 0.5 }}
    >
      <motion.button
        whileHover={{ scale: 1.05 }}
        className={EmployeeListCss.EmployeeRegistButton}
        onClick={onClickEmployeeInsert}
      >
        등록
      </motion.button>
      <motion.button
        whileHover={{ scale: 1.05 }}
        className={EmployeeListCss.EmployeeDeleteButton}
        onClick={onClickEmployeeDelete}
      >
        삭제
      </motion.button>

      <p className={CommonCSS.pageDirection}>학사관리 ▸ 교직원</p>


      <div className={SearchBarCss.basic}>
        <SearchBar options={options} type={type} />
      </div>
      <table className={EmployeeListCss.employeeTable}>
        <colgroup>
          <col width="5%" />
          <col width="10%" />
          <col width="10%" />
          <col width="10%" />
          <col width="20%" />
          <col width="15%" />
          <col width="15%" />
          <col width="10%" />
        </colgroup>
        <thead>
          <tr className={EmployeeListCss.employeeTr}>
            <th>
              <input type="checkbox"
                checked={selectAll}
                onChange={handleSelectAll}
              ></input>
            </th>
            <th>교번</th>
            <th>이름</th>
            <th>학과</th>
            <th>이메일</th>
            <th>휴대전화</th>
            <th>입사일</th>
            <th>상태</th>
          </tr>
        </thead>
        <tbody>
          {(search && search.data) ? (
            search.data.map((staff) => (
              <tr
                key={staff.empCode}
                onClick={() => onEmployeeItemClickHandler(staff.empCode)}
              >
                <td>
                  <input
                    type="checkbox"
                    value={staff.empCode}
                    checked={checkboxes[staff.empCode] || false}
                    onChange={(e) => handleCheckboxChange(e, staff.empCode)}
                    onClick={handleCheckboxClick}
                  />
                </td>
                <td>{staff.empId}</td>
                <td>{staff.empName}</td>
                <td>{staff.department.deptName}</td>
                <td>{staff.empEmail}</td>
                <td>{staff.empPhone}</td>
                <td>{new Date(staff.empEntDate).toISOString().split('T')[0]}</td>
                <td>{staff.empStatus}</td>
              </tr>
            ))
          )
            :
            (Employees && Employees.data) &&
            Employees.data.map((staff) => (
                <tr
                  key={staff.empCode}
                  onClick={() => onEmployeeItemClickHandler(staff.empCode)}
                >
                  <td>
                    <input
                      type="checkbox"
                      value={staff.empCode}
                      checked={checkboxes[staff.empCode] || false}
                      onChange={(e) => handleCheckboxChange(e, staff.empCode)}
                      onClick={handleCheckboxClick}
                    />
                  </td>
                  <td>{staff.empId}</td>
                  <td>{staff.empName}</td>
                  <td>{staff.department.deptName}</td>
                  <td>{staff.empEmail}</td>
                  <td>{staff.empPhone}</td>
                  <td>{new Date(staff.empEntDate).toISOString().split('T')[0]}</td>
                  <td>{staff.empStatus}</td>
                </tr>
              ))
          }
        </tbody>
      </table>
      <div>
        {(search && search.pageInfo) ? (<PagingBar pageInfo={search.pageInfo} setCurrentPage={setCurrentPage} />)
          : (Employees && Employees.pageInfo) ? (<PagingBar pageInfo={Employees.pageInfo} setCurrentPage={setCurrentPage} />)
            : null}
      </div>

    </motion.div>
  );
};

export default EmployeeManagement;