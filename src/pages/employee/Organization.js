import React, { useState } from 'react';
import { motion } from "framer-motion"
import SearchBarCss from '../../css/common/SearchBar.module.css'
import SearchAndListLayout from '../../layouts/SearchAndListLayout';
// import OrganizationItem from "../../components/lists/OrganizationItem.js"

/* 조직도 */

const options = [
  { value: "empCode", name: "교번" },
  { value: "empName", name: "직원명" },
  { value: "deptCode", name: "부서명" },
];

function Organization() {

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ ease: "easeOut", duration: 0.5 }}
      >
        조직도 🎃
      </motion.div>

      <div className={SearchBarCss.basic}>
        <SearchAndListLayout options={options}></SearchAndListLayout>
      </div>

      {/* <OrganizationItem/> */}

      {/* <div className={OrgCss.organization}>
          <div className={OrgCss.orgInform}>
            <div className={OrgCss.orgHeader}><span className={OrgCss.orgName}>고윤정</span> <span>교수</span>
            <br/>
            <p>소속 : </p>
            <p>전공 : </p>
            <p>e-mail : </p>
            </div>
          </div>
          <div className={OrgCss.orgPhoto}>
            <img className={OrgCss.orgImage} alt='고윤정' src='/image/goyoonjeong.jpeg'></img>
          </div>
          <hr/>
          
      </div> */}
    </>
  );
}

export default Organization;