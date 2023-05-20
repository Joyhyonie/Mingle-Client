/* 행정직원의 '교직원 근태 기록' */
import { motion } from "framer-motion";
import ApplideCertidocCSS from '../../css/ApplyCertiDoc.module.css';
import EmployeeAttendanceCSS from '../../css/EmployeeAttendance.module.css';
import CommonCSS from "../../css/common/Common.module.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { callEmployee } from "../../apis/AttendanceAPICalls";
import { useNavigate } from "react-router-dom";
import PagingBar from "../../components/common/PagingBar";
import SearchAndListLayout from "../../layouts/SearchAndListLayout";
import SearchBarCss from '../../css/common/SearchBar.module.css';


function EmployeeAttendance () {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const {data, pageInfo} = useSelector(state => state.EmployeeReducer);

    const options = [
        { value: "sbjName", name: "소속" },
        { value: "deptName", name: "이름" }
    ];

    useEffect(
        ()=>{
            dispatch(callEmployee({currentPage}));
        },
        [currentPage]
    )

    const onClickHandler = (empCode) => {
        navigate(`/attendance-employee/${empCode}`);
    }

    return (
        <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ ease: "easeOut", duration: 0.5 }}
        >
            <div>
                <p className={ CommonCSS.pageDirection }>근태관리 ▸ 교직원 근태 기록</p>
            </div>
            <div className={SearchBarCss.basic}>
          <SearchAndListLayout options={options}></SearchAndListLayout>
            </div>
            <div className={ApplideCertidocCSS.ApplyCertiDocCSS}>
                <table className={ApplideCertidocCSS.ApplyCertiDocCSSTable}>
                    <colgroup>
                    <col width="15%"/>
                    <col width="15%"/>
                    <col width="15%"/>
                    <col width="15%"/>
                    <col width="15%"/>
                    </colgroup>
                    <thead>
                        <tr>
                            <th>교번</th>
                            <th>소속</th>
                            <th>이름</th>
                            <th>상태</th>
                            <th>연차 갯수</th>
                        </tr>
                    </thead>
                    <tbody>
                            {data && (
                            data.map((employee)=>(
                                <tr key={employee.empCode}
                                    onClick={()=> onClickHandler(employee.empCode) }>
                                    <td>{employee.empCode}</td>
                                    <td>{employee.department.deptName}</td>
                                    <td>{employee.empName}</td>
                                    <td>{employee.empStatus}</td>
                                    <td>{employee.empAnnual}</td>
                                </tr>
                            )
                            ))}
                    </tbody>
                </table>
                <div>
                { pageInfo && <PagingBar pageInfo={ pageInfo } setCurrentPage={ setCurrentPage } /> }
                </div>     
            </div>
        </motion.div>
    );
}

export default EmployeeAttendance;