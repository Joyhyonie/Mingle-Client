/* 행정직원의 '교직원 관리' */
import React, { useEffect, useState } from 'react';
import { motion } from "framer-motion";
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import SearchBarCss from '../../css/common/SearchBar.module.css';
import SearchAndListLayout from '../../layouts/SearchAndListLayout';
import EmployeeListCss from '../../css/EmployeeList.module.css';
import { useNavigate } from 'react-router-dom';
import CommonCSS from '../../css/common/Common.module.css';
import PagingBar from '../../components/common/PagingBar';

const options = [
  { value: "empCode", name: "교번" },
  { value: "empName", name: "직원명" },
  { value: "deptCode", name: "부서명" },
];

const pageInfo = { startPage: 1, endPage: 10, currentPage: 1, maxPage: 10 }

function EmployeeManagement() {

  const [selectAll, setSelectAll] = useState(false);
  const [checkboxes, setCheckboxes] = useState({});

  const [currentPage, setCurrentPage] = useState(1);

  const employees = ["employee1", "employee2"];

  const handleSelectAll = () => {
    const newCheckboxes = Object.keys(checkboxes).reduce((prev, curr) => {
      return { ...prev, [curr]: !selectAll };
    }, {});

    setCheckboxes(newCheckboxes);
    setSelectAll(!selectAll);
  };

  // 체크박스 상태를 업데이트하는 함수
  const handleCheckboxChange = (id) => {
    setCheckboxes({ ...checkboxes, [id]: !checkboxes[id] });
  };


  return (
    <motion.div
      className={EmployeeListCss.EmployeeList}
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ ease: "easeOut", duration: 0.5 }}
    >
      <motion.button
        whileHover={{ scale: 1.05 }}
        className={EmployeeListCss.EmployeeRegistButton}
      >
        등록
      </motion.button>
      <motion.button
        whileHover={{ scale: 1.05 }}
        className={EmployeeListCss.EmployeeDeleteButton}
      >
        삭제
      </motion.button>
      <p className={CommonCSS.pageDirection}>학사관리 {">"} 교직원</p>


      <div className={SearchBarCss.basic}>
        <SearchAndListLayout options={options}></SearchAndListLayout>
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
          <tr>
            <td><input type="checkbox"
              id="employee1"
              checked={checkboxes["employee1"] || false}
              onChange={() => handleCheckboxChange("employee1")}
            ></input></td>
            <td>차은우</td>
            <td>0000000</td>
            <td>총무처</td>
            <td>cha123@mingle.ac.kr</td>
            <td>010-1234-5678</td>
            <td>2023-05-15</td>
            <td>재직</td>
          </tr>
          <tr>
            <td><input type="checkbox"
              id="employee2"
              checked={checkboxes["employee2"] || false}
              onChange={() => handleCheckboxChange("employee2")}
            ></input></td>
            <td>차은우</td>
            <td>0000000</td>
            <td>총무처</td>
            <td>cha123@mingle.ac.kr</td>
            <td>010-1234-5678</td>
            <td>2023-05-15</td>
            <td>재직</td>
          </tr>
        </tbody>
      </table>
      <div>
        {pageInfo && <PagingBar pageInfo={pageInfo} setCurrentPage={setCurrentPage} />}
      </div>

    </motion.div>
  );
};

export default EmployeeManagement;