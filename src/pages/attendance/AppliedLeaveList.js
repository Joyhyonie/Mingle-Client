/* 행정직원의 '휴가 신청 내역' */
import { motion } from "framer-motion"
import CommonCSS from "../../css/common/Common.module.css";
import ApplideCertidocCSS from '../../css/ApplyCertiDoc.module.css';
import PagingBar from "../../components/common/PagingBar";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { callLeaveDoc, callLeaveDocSearchName, callLeaveNoUpdateAPI, callLeaveUpdateAPI } from "../../apis/AttendanceAPICalls";
import SearchBar from "../../components/common/SearchBar";
import SearchBarCss from "../../css/common/SearchBar.module.css";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-hot-toast";

function AppliedLeaveList () {

    const [currentPage, setCurrentPage] = useState(1);
    const {attendance,searchName} = useSelector(state => state.AttendanceReducer);
    const {patch} = useSelector(state => state.AttendanceReducer);
    const dispatch = useDispatch();
    const [params] = useSearchParams();
    const condition = params.get('condition');
    const name = params.get('search');

    const type = "leaveDoc";
    
    const options = [
        { value: "applyFormName", label: "증명서종류" },
        { value: "empName", label: "신청자"}
    ];

    useEffect(
        ()=>{
            if(name){
                dispatch(callLeaveDocSearchName({search : name, condition: condition, currentPage : currentPage }));
                return;
            }
            dispatch(callLeaveDoc({currentPage}))
        },
        [currentPage,patch,name,condition]
    )

    const onClickHandler = (leave) => {      
        dispatch(callLeaveUpdateAPI(leave));
        toast.success("승인하였습니다.");
    }

    const onClickRejectHandler = (leave) => {
        dispatch(callLeaveNoUpdateAPI(leave));
        toast.success("반려하였습니다.");
    }

    return (
        <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ ease: "easeOut", duration: 0.5 }}
        >
            <div>
                <p className={ CommonCSS.pageDirection }>근태관리 ▸ 휴가 신청 내역</p>
            </div>
            <div className={SearchBarCss.basic}>
            {<SearchBar options={options} type={type}/>}
           </div>
             <div className={ApplideCertidocCSS.ApplyCertiDocCSS}>
                <table className={ApplideCertidocCSS.ApplyCertiDocCSSTable}>
                    <colgroup>
                    <col width="5%"/>
                    <col width="6%"/>
                    <col width="6%"/>
                    <col width="6%"/>
                    <col width="6%"/>
                    <col width="20%"/>
                    <col width="5%"/>
                    <col width="5%"/>                    
                    <col width="1%"/>  
                    <col width="1%"/>  
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
                            <th></th>                         
                        </tr>
                    </thead>
                    <tbody>
                    {
                        (searchName && searchName.data) ? (
                            searchName.data.map((leave) => (
                                <tr key={leave.leaveDocCode}>
                                <td>{leave.leaveDocCode}</td>
                                <td>{leave.applyDate.split(" ")[0]}</td>
                                <td>{leave.applyForm.applyFormName}</td>
                                <td>{leave.startDate.split(" ")[0]}</td>                            
                                <td>{leave.endDate.split(" ")[0]}</td>
                                <td>{leave.reason}</td>
                                <td>{leave.leaveApplyer.empName}</td>
                                <td>{leave.docStatus}</td>
                                {leave.docStatus == "대기" ? (
                                    <>
                                <td><button
                                onClick={()=>onClickHandler(leave)}
                                >승인</button></td>
                                <td><button onClick={() => onClickRejectHandler(leave)}>반려</button></td>
                                </>
                                ) : null } 
                                </tr>
                            ))
                        ) : (
                            (attendance && attendance.data) && (
                                attendance.data.map((leave) => (
                                <tr key={leave.leaveDocCode}>
                                <td>{leave.leaveDocCode}</td>
                                <td>{leave.applyDate.split(" ")[0]}</td>
                                <td>{leave.applyForm.applyFormName}</td>
                                <td>{leave.startDate.split(" ")[0]}</td>                            
                                <td>{leave.endDate.split(" ")[0]}</td>
                                <td>{leave.reason}</td>
                                <td>{leave.leaveApplyer.empName}</td>
                                <td>{leave.docStatus}</td>
                                {leave.docStatus == "대기" ? (
                                    <>
                                <td><button
                                onClick={()=>onClickHandler(leave)}
                                >승인</button></td>
                                <td><button onClick={() => onClickRejectHandler(leave)}>반려</button></td>
                                </>
                                ) : null }   
                                </tr>
                            ))
                            )
                        )
                        }
                    </tbody>
                </table>
                <div>
                { (searchName && searchName.pageInfo) ? (<PagingBar pageInfo={searchName.pageInfo} setCurrentPage={setCurrentPage} /> ) 
                : (attendance && attendance.pageInfo) ? (<PagingBar pageInfo={attendance.pageInfo} setCurrentPage={setCurrentPage} /> )
                : null }
                </div>
            </div>
        </motion.div>
    );
}

export default AppliedLeaveList;