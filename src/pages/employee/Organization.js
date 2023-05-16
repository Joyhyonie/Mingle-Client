import React, { useState } from 'react';
import { motion } from "framer-motion"
import SearchBarCss from '../../css/common/SearchBar.module.css'
import SearchAndListLayout from '../../layouts/SearchAndListLayout';
import OrgCss from '../../css/Org.module.css';
import CommonCSS from '../../css/common/Common.module.css';
// import OrganizationItem from "../../components/lists/OrganizationItem.js"

/* 조직도 */

const options = [
  { value: "empCode", name: "교번" },
  { value: "empName", name: "직원명" },
  { value: "deptCode", name: "부서명" },
];

function Organization() {

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ ease: "easeOut", duration: 0.5 }}
    >
      <p className={CommonCSS.pageDirection}>조직도</p>
      <div className={OrgCss.OrganizationList}>
        <div className={SearchBarCss.basic}>
          <SearchAndListLayout options={options}></SearchAndListLayout>
        </div>

        <div className={OrgCss.organization}>
          <div className={OrgCss.orgInform}>
            <div className={OrgCss.orgHeader}><span className={OrgCss.orgName}>고윤정</span>
              <span className={OrgCss.orgDept}>교수</span>
              <div className={OrgCss.orgDetail}>
                <br />
                <p>소속 : </p>
                <p>전공 : </p>
                <p>e-mail : </p>
                <br />
              </div>

            </div>
          </div>
          <div className={OrgCss.orgPhoto}>
            <img className={OrgCss.orgImage} alt='고윤정' src='/images/goyoonjeong.png'></img>
          </div>
        </div>

        <div className={OrgCss.organization2}>
          <div className={OrgCss.orgInform}>
            <div className={OrgCss.orgHeader2}><span className={OrgCss.orgName2}>차은우</span>
              <span className={OrgCss.orgDept}>부교수</span>
              <div className={OrgCss.orgDetail}>
                <br />
                <p>소속 : </p>
                <p>전공 : </p>
                <p>e-mail : </p>
                <br />
              </div>

            </div>
          </div>
          <div className={OrgCss.orgPhoto2}>
            <img className={OrgCss.orgImage} alt='차은우' src='/images/chaeunwoo.png'></img>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default Organization;