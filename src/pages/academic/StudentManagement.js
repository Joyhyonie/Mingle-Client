/* 행정직원의 '학생 관리' */
import React, { useState } from 'react';
import { motion } from "framer-motion"
import SearchBarCss from '../../css/common/SearchBar.module.css'
import SearchAndListLayout from '../../layouts/SearchAndListLayout';

const options = [
  { value: "stdCode", name: "학번" },
  { value: "stdName", name: "학생명" },
  { value: "deptCode", name: "학과명" },
];

function StudentManagement() {

  return (
    <div className={SearchBarCss.container}>
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ ease: "easeOut", duration: 0.5 }}
      >
        학생 관리 🕺
      </motion.div>

      <div className={SearchBarCss.basic}>
        <SearchAndListLayout options={options}></SearchAndListLayout>
      </div>
    </div>
  );
}

export default StudentManagement;