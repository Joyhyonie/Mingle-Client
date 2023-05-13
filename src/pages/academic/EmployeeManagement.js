/* 행정직원의 '교직원 관리' */
import React, { useState } from 'react';
import { motion } from "framer-motion"
import SelectBox from "../../components/common/SelectBox"
import SearchBar from "../../components/common/SearchBar";
import SearchBarCss from '../../css/common/SearchBar.module.css'


const OPTIONS = [
        { value : "empCode", name : "교번" },
        { value : "empName", name : "직원명" },
        { value : "deptCode", name : "부서명" },
];

function EmployeeManagement () {

  return (
    <>
      <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ ease: "easeOut", duration: 0.5 }}
      >
          교직원 관리 👻
      </motion.div>

      <div className={SearchBarCss.basic}>
        <SelectBox options={OPTIONS} defaultValue="deptCode"></SelectBox>
        <SearchBar></SearchBar>
      </div>
    </>
  );
}

export default EmployeeManagement;