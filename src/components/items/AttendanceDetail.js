import { motion } from "framer-motion"
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { callEmployeeDetail } from "../../apis/AttendanceAPICalls";
import ApplideCertidocCSS from '../../css/ApplyCertiDoc.module.css';
import CommonCSS from "../../css/common/Common.module.css";
import PagingBar from "../common/PagingBar";

function AttendanceDetail(){

    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(1);
    const {data , pageInfo} = useSelector(state => state.AttendanceReducer);
    const params = useParams();
    console.log(data);
    console.log(params.empCode);
    const empCode = params.empCode;

    useEffect(
        ()=>{
            dispatch(callEmployeeDetail({currentPage,empCode}));
        },
        [empCode]
    )

    return (
        <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ ease: "easeOut", duration: 0.5 }}
        >  
            <div>
                {data && 
                data.map((attendance) => (
                <p className={ CommonCSS.pageDirection }>근태관리 ▸ 교직원 근태 기록 ▸ {attendance.employee.empName}</p>
                ))}
            </div>
             <div className={ApplideCertidocCSS.ApplyCertiDocCSS}>
                <table className={ApplideCertidocCSS.ApplyCertiDocCSSTable}>
                    <colgroup>
                    <col width="10%" />
                    <col width="10%" />
                    <col width="10%" />
                    <col width="10%" />
                    <col width="10%" />                   
                    </colgroup>
                    <thead>
                        <tr>
                            <th>날짜</th>
                            <th>출근</th>
                            <th>퇴근</th>
                            <th>상태</th>
                            <th>비고</th>                          
                        </tr>
                    </thead>
                    <tbody>
                {data && 
                    data.map((attendance) => (
                    <tr key={attendance.atdCode}>
                    <td>{attendance.atdDate}</td>
                    <td>{attendance.atdStartTime}</td>
                    <td>{attendance.atdEndTime}</td>
                    <td>{attendance.atdStatus}</td>
                    <td>{attendance.atdEtc}</td>              
                   </tr>
                ))}   
                    </tbody>
                </table>       
                <div>
                { pageInfo && <PagingBar pageInfo={ pageInfo } setCurrentPage={ setCurrentPage } /> }
                </div>                       
            </div>                   
        </motion.div>
    )
}

export default AttendanceDetail;