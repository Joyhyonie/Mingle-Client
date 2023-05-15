/* 행정직원의 '교직원 관리' */
import React, { useEffect, useState, useRef, useMemo } from 'react';
import { motion } from "framer-motion";
import axios from 'axios';
import SearchBarCss from '../../css/common/SearchBar.module.css';
import SearchAndListLayout from '../../layouts/SearchAndListLayout';
import EmployeeListCss from '../../css/EmployeeList.module.css';
import OrgCss from '../../css/Org.module.css';
import React, { useEffect, useState } from 'react';
import { motion } from "framer-motion";
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import SearchBarCss from '../../css/common/SearchBar.module.css';
import SearchAndListLayout from '../../layouts/SearchAndListLayout';
import EmployeeListCss from '../../css/EmployeeList.module.css';
import { useNavigate } from 'react-router-dom';

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
      className={EmployeeListCss.employeeTitle}
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ ease: "easeOut", duration: 0.5 }}
    >
      <div className={EmployeeListCss}>교직원 관리 👻
      <div className={EmployeeListCss.employeeBtn}>
        <button>등록</button>
        <button>삭제</button>
      </div></div>
      
      <div className={EmployeeListCss.EmployeeList}>
        <div className={SearchBarCss.basic}>
          <SearchAndListLayout options={options}></SearchAndListLayout>
        </div>
        <div>
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
              <tr>
                <td><input type="checkbox"></input></td>
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
        </div>
      </div>
    </motion.div>
  );
};

export default EmployeeManagement;