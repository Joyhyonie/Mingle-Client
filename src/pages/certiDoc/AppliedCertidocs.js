import { motion } from "framer-motion"
import ApplideCertidocCSS from '../../css/ApplyCertiDoc.module.css';
import CommonCSS from "../../css/common/Common.module.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { callCertiDocSearchName, callCertiListAPI, callCertiUpdateAPI } from "../../apis/CertiDocAPICalls";
import PagingBar from "../../components/common/PagingBar";
import SearchBar from "../../components/common/SearchBar";
import SearchBarCss from "../../css/common/SearchBar.module.css";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-hot-toast";

/* 행정직원의 '증명서 발급 신청 내역' */

function AppliedCertidocs () {

    const {certi,certiName} = useSelector(state => state.CertiReducer);
    const { patch } = useSelector(state => state.CertiReducer);
    const [currentPage, setCurrentPage] = useState(1);
    const dispatch = useDispatch();
    const type = "certiDoc";
    const [params] = useSearchParams();
    const condition = params.get('condition');
    const name = params.get('search');

    const options = [
        { value: "certiFormName", label: "증명서종류" },
        { value: "empName", label: "신청자"}
    ];

    useEffect(
        ()=>{
            if(name){
                dispatch(callCertiDocSearchName({search : name, condition: condition, currentPage : currentPage }));
                return;
            }
            dispatch(callCertiListAPI({currentPage}));
        },
        [currentPage,patch,dispatch,name,condition]
    )

    const onClickHandler = (certi) => {              
        dispatch(callCertiUpdateAPI(certi));
        toast.success("승인되었습니다.");
    }

    return (
        <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ ease: "easeOut", duration: 0.5 }}
        >
            <div>
                <p className={ CommonCSS.pageDirection }>증명서 ▸ 증명서 발급 신청 내역</p>
            </div>
            <div className={SearchBarCss.basic}>
            {<SearchBar options={options} type={type}/>}
           </div>
             <div className={ApplideCertidocCSS.AppliedCertiDocCSS}>
                <table className={ApplideCertidocCSS.ApplyCertiDocCSSTable}>
                    <colgroup>
                    <col width="10%"/>
                    <col width="12%"/>
                    <col width="10%"/>
                    <col width="12%"/>
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
                    {
                        (certiName && certiName.data) ? (
                            certiName.data.map((certi) => (
                                <tr key={certi.certiDocCode}>
                                <td>{certi.certiDocCode}</td>
                                <td>{certi.certiApplyDate.split(" ")[0]}</td>
                                <td>{certi.certiForm.certiFormName}</td>
                                <td>{certi.certiUse}</td>
                                <td>{certi.applyer.empName}</td>
                                <td>{certi.reason}</td>
                                <td>{certi.docStatus}</td>
                                {certi.docStatus !== "승인" ? (
                                <td><button
                                onClick={()=>onClickHandler(certi)} 
                                >승인</button></td>
                                  ) : null }
                                </tr>
                            ))
                        ) : (
                            (certi && certi.data) && (
                            certi.data.map((certi) => (
                                <tr key={certi.certiDocCode}>
                                <td>{certi.certiDocCode}</td>
                                <td>{certi.certiApplyDate.split(" ")[0]}</td>
                                <td>{certi.certiForm.certiFormName}</td>
                                <td>{certi.certiUse}</td>
                                <td>{certi.applyer.empName}</td>
                                <td>{certi.reason}</td>
                                <td>{certi.docStatus}</td>
                                {certi.docStatus !== "승인" ? (
                                <td><button
                                onClick={()=>onClickHandler(certi)} 
                                 >승인</button></td>
                                  ) : null }
                                </tr>
                            ))
                            )
                        )
                        }
                    </tbody>
                </table>
                <div>
                { (certiName && certiName.pageInfo) ? (<PagingBar pageInfo={certiName.pageInfo} setCurrentPage={setCurrentPage} /> ) 
                : (certi && certi.pageInfo) ? (<PagingBar pageInfo={certi.pageInfo} setCurrentPage={setCurrentPage} /> )
                : null }
                </div>
            </div>
        </motion.div>
    );
}

export default AppliedCertidocs;