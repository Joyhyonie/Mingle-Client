import { motion } from "framer-motion"
import ApplideCertidocCSS from '../../css/ApplyCertiDoc.module.css';
import CommonCSS from "../../css/common/Common.module.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { callCertiListAPI } from "../../apis/CertiDocAPICalls";
import PagingBar from "../../components/common/PagingBar";

function MyPageAttendance() {
    const {data,pageInfo} = useSelector(state => state.CertiReducer);
    const [currentPage, setCurrentPage] = useState(1);
    const dispatch = useDispatch();

    useEffect(
        ()=>{
            dispatch(callCertiListAPI({currentPage}));
        },
        [currentPage]
    )

    const onClickHandler = (certi) => {
    }

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
                    data.map((certi) => (
                    <tr key={certi.certiDocCode}>
                    <td>{certi.certiDocCode}</td>
                    <td>{certi.certiApplyDate}</td>
                    <td>{certi.certiForm.certiFormCode}</td>
                    <td>{certi.reason}</td>
                    <td>{certi.applyer.empName}</td>
                    <td>{certi.certiUse}</td>
                    
                   </tr>
                ))}   
                    </tbody>
                </table>
            </div>
        </motion.div>
    );
}

export default MyPageAttendance;