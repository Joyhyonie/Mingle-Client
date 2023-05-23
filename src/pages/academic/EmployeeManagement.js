/* 행정직원의 '교직원 관리' */
import { motion } from "framer-motion";
import { useEffect, useState } from 'react';
import { callEmployeesAPI } from '../../apis/AcademicAPICalls';
import { useDispatch, useSelector } from 'react-redux';
import EmployeeInsertModal from "../../components/modal/EmployeeInsertModal";
import SearchBarCss from '../../css/common/SearchBar.module.css';
import EmployeeListCss from '../../css/EmployeeList.module.css';
import CommonCSS from '../../css/common/Common.module.css';
import PagingBar from '../../components/common/PagingBar';
import SearchBar from "../../components/common/SearchBar";
import { useNavigate } from "react-router-dom";

const employeeOptions = [
  { value: "empCode", label: "교번" },
  { value: "empName", label: "직원명" },
  { value: "deptCode", label: "부서명" },
];

const pageInfo = { startPage: 1, endPage: 10, currentPage: 1, maxPage: 10 }

function EmployeeManagement() {

  const dispatch = useDispatch();
  const { data, pageInfo } = useSelector((state) => state.EmployeeReducer);
  const [currentPage, setCurrentPage] = useState(1);

  const [selectAll, setSelectAll] = useState(false);
  const [checkboxes, setCheckboxes] = useState({});

  const [isEmployeeUpdateModalOpen, setIsEmployeeUpdateModalOpen] = useState(false);
  const [isEmployeeInsertModalOpen, setIsEmployeeInsertModalOpen] = useState(false);

  // 아 헷갈려!!! 
  // isEmployeeInsertModalOpen 추가
  useEffect(
    () => {
      dispatch(callEmployeesAPI({ currentPage }))
    },
    [currentPage, isEmployeeInsertModalOpen, isEmployeeUpdateModalOpen]
  );

  // onClickTableTr => 테이블 행 클릭시 교직원 상세 조회 및 수정 페이지로 라우팅
  const onClickTableTr = (employee) => {
    setIsEmployeeUpdateModalOpen(true);
  }

  // onCLickInsert => emp인서트모달창 오픈
  const onCLickInsert = () => {
    setIsEmployeeInsertModalOpen(true);
  }

  const handleSelectAll = () => {
    const newCheckboxes = Object.keys(checkboxes).reduce((prev, curr) => {
      return { ...prev, [curr]: !selectAll };
    }, {});

    setCheckboxes(newCheckboxes);
    setSelectAll(!selectAll);
  };



  return (
    <motion.div
      className={EmployeeListCss.EmployeeList}
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ ease: "easeOut", duration: 0.5 }}
    >
      <motion.button
        whileHover={{ scale: 1.05 }}
        className={EmployeeListCss.EmployeeRegistButton}
        onClick={() => setIsEmployeeInsertModalOpen(true)}
      >
        등록
      </motion.button>
      {isEmployeeInsertModalOpen && (
        <EmployeeInsertModal setIsEmployeeInsertModalOpen={setIsEmployeeInsertModalOpen} />
      )}
      <motion.button
        whileHover={{ scale: 1.05 }}
        className={EmployeeListCss.EmployeeDeleteButton}
      >
        삭제
      </motion.button>
      <p className={CommonCSS.pageDirection}>학사관리 ▸ 교직원</p>


      <div className={SearchBarCss.basic}>
        {<SearchBar
          options={employeeOptions}>
        </SearchBar>}
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
          {data &&
            data.map((employee) => (
              <tr
                key={employee.empCode}
                onClick={() => onClickTableTr(employee.empCode)}>
                <td><input type="checkbox" value={employee.empCode} /></td>
                <td>{employee.empCode}</td>
                <td>{employee.empName}</td>
                <td>{employee.department.deptName}</td>
                <td>{employee.empEmail}</td>
                <td>{employee.empPhone}</td>
                <td>{new Date(employee.empEntDate).toISOString().split('T')[0]}</td>
                <td>{employee.empStatus}</td>
              </tr>
            ))}
        </tbody>
      </table>
      <div>
        {pageInfo && <PagingBar pageInfo={pageInfo} setCurrentPage={setCurrentPage} />}
      </div>

    </motion.div>
  );
};

export default EmployeeManagement;