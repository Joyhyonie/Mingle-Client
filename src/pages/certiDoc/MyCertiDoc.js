import { motion } from "framer-motion"
import MyCertiDocCSS from '../../css/MyCertiDoc.module.css'

/* 모든 교직원의 '증명서 발급 이력' */

function MyCertiDoc () {

    return (
        <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ ease: "easeOut", duration: 0.5 }}
        >
            <div className={MyCertiDocCSS.MyCertiDocCSS}>
                <table className={MyCertiDocCSS.MyCertiDocCSSTable}>
                    <colgroup>
                    <col width="20%"/>
                    <col width="10%"/>
                    <col width="20%"/>
                    <col width="10%"/>
                    <col width="30%"/>
                    <col width="20%"/>                                        
                    <col width="10%"/>                                       
                    </colgroup>
                    <thead>
                        <tr>
                            <th>문서코드</th>
                            <th>신청일자</th>
                            <th>증명서종류</th>
                            <th>용도</th>
                            <th>사유</th>
                            <th>상태</th>
                            <th></th> <br/>
                            <br></br>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>20230001</td>
                            <td>2023-05-14</td>
                            <td>재직증명서</td>
                            <td>은행제출용</td>
                            <td>어저꾸저쩌구쏼라쏼라</td>
                            <td>대기</td>
                            <td><button>보기</button></td>
                        </tr>
                    </tbody>
                </table>
            </div>
          
        </motion.div>
    );
}

export default MyCertiDoc;