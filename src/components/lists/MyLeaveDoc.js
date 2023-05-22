import { motion } from "framer-motion"
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CommonCSS from '../../css/common/Common.module.css';
import { callMyLeave } from "../../apis/AttendanceAPICalls";
import PagingBar from "../common/PagingBar";
import ApplideCertidocCSS from '../../css/ApplyCertiDoc.module.css';

function MyLeave(){

    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(1);
    const {myleave} = useSelector(state => state.AttendanceReducer);
    console.log(myleave);

    useEffect(
        ()=>{
            dispatch(callMyLeave({currentPage}));
        },
        []
    )

    return (
        <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ ease: "easeOut", duration: 0.5 }}
        >
           
           <div>
      <p className={ CommonCSS.pageDirection }>마이페이지 ▸ 휴가신청서</p>
      </div>
             <div className={ApplideCertidocCSS.ApplyCertiDocCSS}>
                <table className={ApplideCertidocCSS.ApplyCertiDocCSSTable}>
                    <colgroup>
                    <col width="10%" />
                    <col width="10%" />
                    <col width="10%" />
                    <col width="20%" />
                    <col width="20%" />
                    <col width="10%" />
                    <col width="10%" />                   
                    </colgroup>
                    <thead>
                        <tr>
                            <th>신청일</th>
                            <th>결제일</th>
                            <th>상태</th>
                            <th>사유</th>
                            <th>신청서종류</th>
                            <th>시작일</th>
                            <th>종료일</th>
                            <th>결제자</th>
                        </tr>
                    </thead>
                    <tbody>
                    
                    {myleave &&
                    myleave.data.map((leave) =>(
                        <tr key={leave.leaveDocCode}>
                            <td>{leave.applyDate ? leave.applyDate.split(" ")[0] : "X"}</td>
                            <td>{leave.signDate ? leave.signDate.split(" ")[0] : "X"}</td>
                            <td>{leave.docStatus}</td>
                            <td>{leave.reason}</td>
                            <td>{leave.applyForm.applyFormName}</td>
                            <td>{leave.startDate ? leave.startDate.split(" ")[0] : "X"}</td>
                            <td>{leave.endDate ? leave.endDate.split(" ")[0] : "X"}</td>
                            <td>{leave.accepter.empName}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                <div>
                { myleave && <PagingBar pageInfo={ myleave.pageInfo } setCurrentPage={ setCurrentPage } /> }
                </div>
            </div>
        </motion.div>
    );
}

export default MyLeave;