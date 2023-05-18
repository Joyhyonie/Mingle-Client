import { useEffect, useState } from 'react';
import { motion } from "framer-motion"
import { callEmployeesAPI } from '../../apis/AcademicAPICalls';
import { useDispatch, useSelector } from 'react-redux';
import SearchBarCss from '../../css/common/SearchBar.module.css'
import SearchAndListLayout from '../../layouts/SearchAndListLayout';
import CommonCSS from '../../css/common/Common.module.css';
import PagingBar from '../../components/common/PagingBar';
import OrganizationList from '../../components/lists/OrganizationList';
import OrganizationItemCss from "../../css/OrganizationItemCss.module.css";

/* 조직도 */

const options = [
  { value: "empCode", name: "교번" },
  { value: "empName", name: "직원명" },
  { value: "deptCode", name: "부서명" },
];

const pageInfo = { startPage: 1, endPage: 10, currentPage: 1, maxPage: 10 }

function Organization() {

  const dispatch = useDispatch();
  const { data, pageInfo } = useSelector((state) => state.EmployeeReducer);
  const [currentPage, setCurrentPage] = useState(1);
  const employeeList = data;

  useEffect(
    () => {
      dispatch(callEmployeesAPI({ currentPage }))
    },
    [currentPage]
  );

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ ease: "easeOut", duration: 0.5 }}
    >
      <p className={CommonCSS.pageDirection}>조직도</p>

      <div className={SearchBarCss.basic}>
        <SearchAndListLayout options={options}></SearchAndListLayout>
      </div>

      <div className={ OrganizationItemCss.div }>
      <div>
        { employeeList && <OrganizationList employeeList={employeeList} />}
      </div>

      <div>
        {pageInfo && <PagingBar pageInfo={pageInfo} setCurrentPage={setCurrentPage} />}
      </div>
      </div>
    </motion.div>
  );
}

export default Organization;