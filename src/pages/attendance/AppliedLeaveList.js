/* 행정직원의 '휴가 신청 내역' */
import { motion } from "framer-motion"
import CommonCSS from "../../css/common/Common.module.css";
import ApplideCertidocCSS from '../../css/ApplyCertiDoc.module.css';
import PagingBar from "../../components/common/PagingBar";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { callLeaveDoc, callLeaveUpdateAPI } from "../../apis/AttendanceAPICalls";


function AppliedLeaveList () {

    const [currentPage, setCurrentPage] = useState(1);
    const {attendance} = useSelector(state => state.AttendanceReducer);
    const {patch} = useSelector(state => state.AttendanceReducer);
    const dispatch = useDispatch();
    
    console.log("at",attendance);

    useEffect(
        ()=>{
            dispatch(callLeaveDoc({currentPage}))
        },
        [currentPage,patch]
    )

    const onClickHandler = (leave) => {      
        dispatch(callLeaveUpdateAPI(leave));
        
    }

    return (
        <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ ease: "easeOut", duration: 0.5 }}
        >
            <div>
                <p className={ CommonCSS.pageDirection }>증명서 ▸ 휴가 신청 내역</p>
            </div>
             <div className={ApplideCertidocCSS.ApplyCertiDocCSS}>
                <table className={ApplideCertidocCSS.ApplyCertiDocCSSTable}>
                    <colgroup>
                    <col width="10%"/>
                    <col width="10%"/>
                    <col width="10%"/>
                    <col width="15%"/>
                    <col width="15%"/>
                    <col width="10%"/>
                    <col width="10%"/>
                    <col width="10%"/>                    
                    </colgroup>
                    <thead>
                        <tr>
                            <th>문서코드</th>
                            <th>신청일자</th>
                            <th>증명서종류</th>
                            <th>시작일</th>
                            <th>종료일</th>
                            <th>사유</th>
                            <th>신청자</th>
                            <th>상태</th>
                            <th></th>                            
                        </tr>
                    </thead>
                    <tbody>
                    {attendance && (
                    attendance.data.map((leave)=>(
                        <tr key={leave.leaveDocCode}>
                            <td>{leave.leaveDocCode}</td>
                            <td>{leave.applyDate.split(" ")[0]}</td>
                            <td>{leave.applyForm.applyFormName}</td>
                            <td>{leave.startDate.split(" ")[0]}</td>                            
                            <td>{leave.endDate.split(" ")[0]}</td>
                            <td>{leave.reason}</td>
                            <td>{leave.leaveApplyer.empName}</td>
                            <td>{leave.docStatus}</td>
                            {leave.docStatus !== "승인" ? (
                            <td><button
                            onClick={()=>onClickHandler(leave)} 
                            >승인</button></td>
                            ) : null }
                        </tr>
                    )
                    ))}
                    </tbody>
                </table>
                
            </div>
        </motion.div>
    );
}

export default AppliedLeaveList;