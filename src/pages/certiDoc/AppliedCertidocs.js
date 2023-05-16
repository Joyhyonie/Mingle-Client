import { motion } from "framer-motion"
import ApplideCertidocCSS from '../../css/ApplyCertiDoc.module.css';
import CommonCSS from "../../css/common/Common.module.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { callCertiListAPI, callCertiUpdateAPI } from "../../apis/CertiDocAPICalls";
import PagingBar from "../../components/common/PagingBar";

/* 행정직원의 '증명서 발급 신청 내역' */

function AppliedCertidocs () {

    const {data,pageInfo} = useSelector(state => state.CertiReducer);
    const [currentPage, setCurrentPage] = useState(1);
    const dispatch = useDispatch();
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString();

    useEffect(
        ()=>{
            dispatch(callCertiListAPI({currentPage}));
        },
        [currentPage]
    )

    const onClickHandler = (certi) => {
        console.log(formattedDate);
        
        const formData = new FormData();
        formData.append("certiDocCode" , certi.certiDocCode);
        formData.append("certiApplyDate" , certi.certiApplyDate);
        formData.append("signDate" , formattedDate);
        formData.append("docStatus", "승인");
        formData.append("reason" , certi.reason);
        formData.append("applyer.empCode" , certi.applyer.empCode);
        formData.append("accepter.empCode" , "20231030");
        formData.append("certiForm.certiFormCode" , certi.certiForm.certiFormCode);
        formData.append("certiUse" , certi.certiUse);
        
        console.log(formData);

        dispatch(callCertiUpdateAPI(formData));
    }

    return (
        <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ ease: "easeOut", duration: 0.5 }}
        >
            <div>
                <p className={ CommonCSS.pageDirection }>증명서 ▸ 증명서 발급 신청 내역</p>
            </div>
             <div className={ApplideCertidocCSS.ApplyCertiDocCSS}>
                <table className={ApplideCertidocCSS.ApplyCertiDocCSSTable}>
                    <colgroup>
                    <col width="10%"/>
                    <col width="20%"/>
                    <col width="10%"/>
                    <col width="10%"/>
                    <col width="10%"/>
                    <col width="25%"/>
                    <col width="10%"/>
                    <col width="10%"/>                    
                    </colgroup>
                    <thead>
                        <tr>
                            <th>문서코드</th>
                            <th>신청일자</th>
                            <th>증명서종류</th>
                            <th>용도</th>
                            <th>신청자</th>
                            <th>사유</th>
                            <th>상태</th>
                            <th></th>                            
                        </tr>
                    </thead>
                    <tbody>
                {data && 
                    data.map((certi) => (
                    <tr key={certi.certiDocCode}>
                    <td>{certi.certiDocCode}</td>
                    <td>{certi.certiApplyDate.split(" ")[0]}</td>
                    <td>{certi.certiForm.certiFormName}</td>
                    <td>{certi.reason}</td>
                    <td>{certi.applyer.empName}</td>
                    <td>{certi.certiUse}</td>
                    <td>{certi.docStatus}</td>
                    {certi.docStatus !== "승인" ? (
                    <td><button
                    onClick={()=>onClickHandler(certi)} 
                   >승인</button></td>
                   ) : null }
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

export default AppliedCertidocs;