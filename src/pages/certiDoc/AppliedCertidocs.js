import { motion } from "framer-motion"
import ApplideCertidocCSS from '../../css/ApplideCertidocCSS.module.css'

/* 행정직원의 '증명서 발급 신청 내역' */

function AppliedCertidocs () {

    return (
        <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ ease: "easeOut", duration: 0.5 }}
        >
             <div className={ApplideCertidocCSS.AppliedCertidoc}>
                <table className={ApplideCertidocCSS.AppliedCertidocTable}>
                    <colgroup>
                    <col width="10%"/>
                    <col width="10%"/>
                    <col width="10%"/>
                    <col width="20%"/>
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
                            <th></th> <br/>
                            <br></br>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>20230001</td>                            
                            <td>2023-00-01</td>
                            <td>재직증명서</td>
                            <td>은행제출용</td>
                            <td>이진호</td>
                            <td>어쩌구저쩌구쏼라쏼라</td>
                            <td>대기중</td>
                            <td><button>승인</button></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </motion.div>
    );
}

export default AppliedCertidocs;