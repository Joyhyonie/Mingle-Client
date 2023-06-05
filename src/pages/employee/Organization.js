import { useEffect, useState } from 'react';
import { motion } from "framer-motion"
import { callAllEmployeesAPI, callOrganizationSearchListAPI } from '../../apis/AcademicAPICalls';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useSearchParams } from "react-router-dom";
import SearchBarCss from '../../css/common/SearchBar.module.css'
import CommonCSS from '../../css/common/Common.module.css';
import PagingBar from '../../components/common/PagingBar';
import SearchBar from '../../components/common/SearchBar';
import OrganizationItemCss from "../../css/OrganizationItemCss.module.css";

const options = [
  { value: "empName", label: "직원명" },
  { value: "deptName", label: "부서명" },
];

function Organization() {

  const dispatch = useDispatch();
  const { employeeList, search } = useSelector((state) => state.OrganizationReducer);
  const [currentPage, setCurrentPage] = useState(1);
  console.log(employeeList);

  /* 검색어 요청시 사용할 값 */
  const [params] = useSearchParams();
  const condition = params.get('condition');
  const name = params.get('search');
  const type = "organization";


  useEffect(
    () => {
      if (name) {
        /* 검색어에 해당하는 직원에 대한 요청 */
        setCurrentPage(1);
        dispatch(callOrganizationSearchListAPI({ search: name, condition: condition, currentPage: currentPage }))
        return;
      }
      /* 모든 직원 정보에 대한 요청 */
      dispatch(callAllEmployeesAPI({ currentPage }))
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
        {(search && search.data) ? (
          search.data.map((organization) =>
            <div className={OrganizationItemCss.organizationBox} key={organization.empCode}>
              <div className={OrganizationItemCss.organizationItems}>
                <div className={OrganizationItemCss.orgNameBox}>
                  <p className={OrganizationItemCss.orgEmpName}>{organization.empName}</p>
                  <p className={OrganizationItemCss.orgEmpNameEn}>{organization.empNameEn}</p>
                </div>
                <div className={OrganizationItemCss.orgContentBox}>
                  <br />
                  <p className={OrganizationItemCss.orgDeptName}>소속 : {organization.department.deptName}</p>
                  <p className={OrganizationItemCss.orgEmpEmail}>이메일 : {organization.empEmail}</p>
                  <p className={OrganizationItemCss.orgEmpEmail}>대표전화 : {organization.empPhone}</p>
                  <br />
                </div>
              </div>
              <img src={organization.empProfile} alt={organization.empName} />
            </div>
          ))
          :
          (employeeList && employeeList.data) && (
            employeeList.data.map((organization) => (
              <div className={OrganizationItemCss.organizationBox} key={organization.empCode}>
                <div className={OrganizationItemCss.organizationItems}>
                  <div className={OrganizationItemCss.orgNameBox}>
                    <p className={OrganizationItemCss.orgEmpName}>{organization.empName}</p>
                    <p className={OrganizationItemCss.orgEmpNameEn}>{organization.empNameEn}</p>
                  </div>
                  <div className={OrganizationItemCss.orgContentBox}>
                    <br />
                    <p className={OrganizationItemCss.orgDeptName}>소속 : {organization.department.deptName}</p>
                    <p className={OrganizationItemCss.orgEmpEmail}>이메일 : {organization.empEmail}</p>
                    <p className={OrganizationItemCss.orgEmpEmail}>대표전화 : {organization.empPhone}</p>
                    <br />
                  </div>
                </div>
                <img src={organization.empProfile} alt={organization.empName} />
              </div>
            ))
          )
          }
        <div>
          {(search && search.pageInfo) ? (<PagingBar pageInfo={search.pageInfo} setCurrentPage={setCurrentPage} />)
            : (employeeList && employeeList.pageInfo) ? (<PagingBar pageInfo={employeeList.pageInfo} setCurrentPage={setCurrentPage} />)
              : null}
        </div>
      </div>
    </motion.div>
  );
}

export default Organization;