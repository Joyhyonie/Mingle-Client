import ApplideCertidocCSS from '../../css/ApplyCertiDoc.module.css';
import PagingBar from "../common/PagingBar";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { callMyAttendance } from '../../apis/AttendanceAPICalls';
import { motion } from "framer-motion"


function MyAttendance(){

    const [currentPage, setCurrentPage] = useState(1);
    const dispatch = useDispatch();
    const {data, pageInfo} = useSelector(state => state.AttendanceReducer);

    useEffect(
        ()=>{
            dispatch(callMyAttendance({currentPage}));
        },
        []
    )


    return (
        <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ ease: "easeOut", duration: 0.5 }}
        >
           
             <div className={ApplideCertidocCSS.ApplyCertiDocCSS}>
                <table className={ApplideCertidocCSS.ApplyCertiDocCSSTable}>
                    <colgroup>
                    <col width="25%" />
                    <col width="40%" />
                    <col width="40%" />
                    <col width="50%" />
                    <col width="100%" />                   
                    </colgroup>
                    <thead>
                        <tr>
                            <th>날짜</th>
                            <th>출근</th>
                            <th>퇴근</th>
                            <th>상태</th>
                            <th>비고</th>                         
                            <th></th>                            
                        </tr>
                    </thead>
                    <tbody>
                    {data && 
                        data.map((myAttendance)=>(
                            <tr key={myAttendance.atdCode}>
                                <td>{myAttendance.atdDate ? myAttendance.atdDate.split(" ")[0] : "X"}</td>
                                <td>{myAttendance.atdStartTime ? myAttendance.atdStartTime.split(" ")[1] : "X"}</td>
                                <td>{myAttendance.atdEndTime ? myAttendance.atdEndTime.split(" ")[1] : 'X'}</td>
                                <td>{myAttendance.atdStatus}</td>
                                <td>{myAttendance.atdEtc ? myAttendance.atdEtc : "없음"}</td>
                            </tr>
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

export default MyAttendance;