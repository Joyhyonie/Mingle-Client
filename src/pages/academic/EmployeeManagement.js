/* 행정직원의 '교직원 관리' */
import React, { useEffect, useState, useRef, useMemo } from 'react';
import { motion } from "framer-motion";
import axios from 'axios';
import SearchBarCss from '../../css/common/SearchBar.module.css';
import SearchAndListLayout from '../../layouts/SearchAndListLayout';
import EmployeeListCss from '../../css/EmployeeList.module.css';
import OrgCss from '../../css/Org.module.css';

const options = [
  { value: "empCode", name: "교번" },
  { value: "empName", name: "직원명" },
  { value: "deptCode", name: "부서명" },
];


function EmployeeManagement() {

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ ease: "easeOut", duration: 0.5 }}
    >
      교직원 관리 👻

      <div className={SearchBarCss.basic}>
        <SearchAndListLayout options={options}></SearchAndListLayout>
      </div>

      <div className={EmployeeListCss.EmployeeList}>
        <table className={EmployeeListCss.EmployeeListTable}>
          <thread>
            
            <tr>
              <input type="checkbox"></input>
              <th>이름</th>
              <th>교번</th>
              <th>학과</th>
              <th>이메일</th>
              <th>휴대전화</th>
              <th>입사일</th>
              <th>상태</th>
              <br />
            </tr>
          </thread>
          
          <tbody>
            <hr/>
            <tr>
              <input type="checkbox"></input>
              <td>홍길동</td>
              <td>000001</td>
              <td>경영학과</td>
              <td>hong123@mingle.ac.kr</td>
              <td>010-1234-5678</td>
              <td>2023-03-12</td>
              <td>재직</td>
            </tr>
          </tbody>
        </table>
      </div>


    </motion.div>
  );
};

export default EmployeeManagement;