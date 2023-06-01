import { useEffect, useState } from 'react';
import { motion } from "framer-motion"
import { callAllEmployeesAPI, callEmployeeOrgSearchListAPI } from '../../apis/AcademicAPICalls';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useSearchParams } from "react-router-dom";
import SearchBarCss from '../../css/common/SearchBar.module.css'
import CommonCSS from '../../css/common/Common.module.css';
import PagingBar from '../../components/common/PagingBar';
import SearchBar from '../../components/common/SearchBar';
import OrganizationList from '../../components/lists/OrganizationList';
import OrganizationItemCss from "../../css/OrganizationItemCss.module.css";

/* 조직도 */

function Organization() {

  const dispatch = useDispatch();
  const { employeeList, search } = useSelector(state => state.OrganizationReducer);
  const [currentPage, setCurrentPage] = useState(1);
  console.log(employeeList);
  const type = "organization";

  /* 검색어 요청시 사용할 값 */
  const [searchParams] = useSearchParams();
  const condition = searchParams.get('condition');
  const name = searchParams.get('search');
  const options = [
    { value: "empName", label: "직원명" },
    { value: "deptName", label: "부서명" },
  ];


  useEffect(
    () => {
      if (name) {
        /* 검색어에 해당하는 직원에 대한 요청 */
        dispatch(callEmployeeOrgSearchListAPI({ search: name, condition: condition, currentPage: currentPage }));
        return;
      } else {
        /* 모든 직원 정보에 대한 요청 */
        dispatch(callAllEmployeesAPI({ currentPage }))
      }
    },
    [currentPage, condition, name]
  );

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ ease: "easeOut", duration: 0.5 }}
    >
      <p className={CommonCSS.pageDirection}>조직도</p>

      <div className={SearchBarCss.basic}>
        {<SearchBar
          options={options}
          type={type}
        />}
      </div>

      <div className={OrganizationItemCss.div}>
        <div>
          {
            employeeList && employeeList.data && <OrganizationList employeeList={employeeList.data} />}
        </div>

        <div>
          {employeeList && employeeList.pageInfo && <PagingBar pageInfo={employeeList.pageInfo} setCurrentPage={setCurrentPage} />}
        </div>
      </div>

    </motion.div>
  );
}

export default Organization;