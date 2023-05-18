/* 행정직원의 '교직원 근태 기록' */
import { motion } from "framer-motion"
import EmployeeAttendanceCSS from '../../css/EmployeeAttendance.module.css'
import CommonCSS from "../../css/common/Common.module.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { callEmployee } from "../../apis/AttendanceAPICalls";
import { useNavigate } from "react-router-dom";


function EmployeeAttendance () {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const {data, pageInfo} = useSelector(state => state.EmployeeReducer);


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
            <div className={EmployeeAttendanceCSS.EmployeeAttendanceDiv}><button className={EmployeeAttendanceCSS.EmployeeAttendanceBtn}>교수</button>
            <button className={EmployeeAttendanceCSS.EmployeeAttendanceBtn}>행정직원</button></div>
            <div className={EmployeeAttendanceCSS.EmployeeAttendance}>
                <table className={EmployeeAttendanceCSS.EmployeeAttendanceTable}>
                    <colgroup>
                    <col width="15%"/>
                    <col width="15%"/>
                    <col width="15%"/>                 
                    </colgroup>
                    <thead>
                        <tr>
                            <th>교번</th>
                            <th>소속</th>
                            <th>이름</th>
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
                                </tr>
                            )
                            ))}
                    </tbody>
                </table>
            </div>
            <div className={EmployeeAttendanceCSS.EmployeeAttendance}>
                <table className={EmployeeAttendanceCSS.EmployeeAttendanceTable}>
                    <colgroup>
                    <col width="15%"/>
                    <col width="15%"/>
                    <col width="15%"/>                 
                    </colgroup>
                    <thead>
                        <tr>
                            <th>교번</th>
                            <th>소속</th>
                            <th>이름</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>20230001</td>                            
                            <td>경영학과</td>
                            <td>이진호</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </motion.div>
    );
}

export default EmployeeAttendance;