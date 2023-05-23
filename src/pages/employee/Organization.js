import { useEffect, useState } from 'react';
import { motion } from "framer-motion"
import { callEmployeesAPI, callEmployeeSearchListAPI } from '../../apis/AcademicAPICalls';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useSearchParams } from "react-router-dom";
import SearchBarCss from '../../css/common/SearchBar.module.css'
import CommonCSS from '../../css/common/Common.module.css';
import PagingBar from '../../components/common/PagingBar';
import SearchBar from '../../components/common/SearchBar';
import OrganizationList from '../../components/lists/OrganizationList';
import OrganizationItemCss from "../../css/OrganizationItemCss.module.css";

/* 조직도 */

const organizationOptions = [
  { value: "empName", label: "직원명" },
  { value: "deptCode", label: "부서명" },
];

const pageInfo = { startPage: 1, endPage: 10, currentPage: 1, maxPage: 10 }

function Organization() {

  const dispatch = useDispatch();
  const { data, pageInfo } = useSelector((state) => state.EmployeeReducer);
  const [currentPage, setCurrentPage] = useState(1);
  const employeeList = data;

  /* 검색어 요청시 사용할 값 */
  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get('value');


  useEffect(
    () => {
      if (search) {
        /* 검색어에 해당하는 직원에 대한 요청 */
        dispatch(callEmployeeSearchListAPI({ search, currentPage }));
      } else {
        /* 모든 직원 정보에 대한 요청 */
        dispatch(callEmployeesAPI({ currentPage }))
      }
    },
    [currentPage, search]
  );

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ ease: "easeOut", duration: 0.5 }}
    >
      <p className={CommonCSS.pageDirection}>조직도</p>

      <div className={SearchBarCss.basic}>
        {<SearchBar
          options={organizationOptions}>
        </SearchBar>}
      </div>

      <div className={OrganizationItemCss.div}>
        <div>
          {employeeList && <OrganizationList employeeList={employeeList} />}
        </div>

        <div>
          {pageInfo && <PagingBar pageInfo={pageInfo} setCurrentPage={setCurrentPage} />}
        </div>
      </div>

    </motion.div>
  );
}

export default Organization;