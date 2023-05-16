/* 행정직원의 '교직원 관리' */
import { useEffect, useState } from 'react';
import { motion } from "framer-motion";
import { useDispatch, useSelector } from 'react-redux';
import SearchBarCss from '../../css/common/SearchBar.module.css';
import SearchAndListLayout from '../../layouts/SearchAndListLayout';
import EmployeeListCss from '../../css/EmployeeList.module.css';
// import { useNavigate } from 'react-router-dom';
import PagingBar from '../../components/common/PagingBar';
import { callEmployeeListAPI } from '../../apis/AcademicAPICalls';

function EmployeeManagement() {

  const dispatch = useDispatch();
  const { data, pageInfo } = useSelector(state => state.employee);
  const [currentPage, setCurrentPage] = useState(1);

  const options = [
    { value: "empCode", name: "교번" },
    { value: "empName", name: "직원명" },
    { value: "deptCode", name: "부서명" },
  ];

  useEffect(
    () => {
      dispatch(callEmployeeListAPI({ currentPage }))
    },
    [currentPage]
  );

  // 테이블 행을 클릭 시 상세 페이지 및 수정 페이지로 라우팅
  // const onClickTableTr = (empCode) => {
  //   navigate(`/employee-update/${empCode}`);
  // }

  // const onClickEmployeeInsert = () => {
  //   navigate("/employee-registration");
  // }

  return (
    <motion.div
      className={EmployeeListCss.employeeTitle}
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ ease: "easeOut", duration: 0.5 }}
    >
      <div className={EmployeeListCss}>교직원 관리 👻
      </div>

      <div className={EmployeeListCss.EmployeeList}>
        <div className={SearchBarCss.basic}>
          <SearchAndListLayout options={options}></SearchAndListLayout>
        </div>
        <div className={EmployeeListCss.employeeBtn}>
          <button>등록</button>
          <button>삭제</button>
        </div>
        <div className={EmployeeListCss.employeeBody}>
          <table className={EmployeeListCss.employeeTable}>
            <colgroup>
              <col width="50px" />
              <col width="150px" />
              <col width="150px" />
              <col width="200px" />
              <col width="450px" />
              <col width="200px" />
              <col width="200px" />
              <col width="150px" />
            </colgroup>
            <thead>
              <tr className={EmployeeListCss.employeeTr}>
                <th><input type="checkbox"></input></th>
                <th>이름</th>
                <th>교번</th>
                <th>학과</th>
                <th>이메일</th>
                <th>휴대전화</th>
                <th>입사일</th>
                <th>상태</th>
              </tr>
            </thead>
            <tbody>
              {data && data.map((employee) => (
              <tr
                key={employee.empCode}
                // onClick={() => onClickTableTr(employee.empCode)}
              >
                <td><input type="checkbox"></input></td>
                <td>{employee.empCode}</td>
                <td>{employee.empName}</td>
                <td>{employee.department.deptCode}</td>
                <td>{employee.empEmail}</td>
                <td>{employee.empPhone}</td>
                <td>{employee.empEntDate}</td>
                <td>{employee.status}</td>
              </tr>))
              }
            </tbody>
          </table>
        </div>
        <div>
          { pageInfo && <PagingBar pageInfo={pageInfo} setCurrentPage={setCurrentPage}/> }
        </div>

      </div>

    </motion.div>
  );
};

export default EmployeeManagement;