/* 행정직원의 '교직원 관리' */
import { motion } from "framer-motion";
import { useEffect, useState } from 'react';
import { callEmployeesAPI, callEmployeesDeleteAPI } from '../../apis/AcademicAPICalls';
import { useDispatch, useSelector } from 'react-redux';
import SearchBar from '../../components/common/SearchBar';
import SearchBarCss from '../../css/common/SearchBar.module.css';
import EmployeeListCss from '../../css/EmployeeList.module.css';
import CommonCSS from '../../css/common/Common.module.css';
import PagingBar from '../../components/common/PagingBar';
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { toast } from "react-hot-toast";

const employeeOptions = [
  { value: 'option1', label: 'option 1' },
  { value: 'option2', label: 'option 2' },
];

const pageInfo = { startPage: 1, endPage: 10, currentPage: 1, maxPage: 10 }

function EmployeeManagement() {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data, pageInfo } = useSelector((state) => state.EmployeeReducer);
  const [currentPage, setCurrentPage] = useState(1);

  const [selectAll, setSelectAll] = useState(false);
  const [checkboxes, setCheckboxes] = useState({});



  // 검색!
  const handleSearch = (selectedOption, inputValue) => {
    // 이곳에 검색 로직을 구현해야 합니다
    // 예를 들어, API 호출 등을 수행할 수 있습니다
    console.log("Selected option:", selectedOption);
    console.log("Input value:", inputValue);
  };

  useEffect(
    () => {
      dispatch(callEmployeesAPI({ currentPage }))
    },
    [currentPage]
  );


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
    data.forEach((employee) => {
      newCheckboxes[employee.empCode] = e.target.checked;
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
        <SearchBar
          options={employeeOptions}
          onSearch={handleSearch}>
        </SearchBar>
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
              >
                <td>
                  <input
                    type="checkbox"
                    value={employee.empCode}
                    checked={checkboxes[employee.empCode] || false}
                    onChange={(e) => handleCheckboxChange(e, employee.empCode)}
                  />
                </td>
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