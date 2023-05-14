import { motion } from "framer-motion"
import ApplyCertiDocCSS from '../../css/ApplyCertiDoc.module.css'


/* 모든 교직원의 '증명서 발급 신청' */

function ApplyCertiDoc () {

    return (
        <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ ease: "easeOut", duration: 0.5 }}
        >
            <div className={ApplyCertiDocCSS.ApplyCertiDocCSS}>
                <table className={ApplyCertiDocCSS.ApplyCertiDocCSSTable}>
                    <colgroup>
                    <col width="10%"/>
                    <col width="20%"/>
                    <col width="20%"/>
                    <col width="40%"/>
                    <col width="20%"/>
                    <col width="20%"/>                    
                    </colgroup>
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>종류</th>
                            <th>용도</th>
                            <th>사유</th>
                            <th>발급 소요일</th>
                            <th></th> <br/>
                            <br></br>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>3</td>
                            <td>재직증명서</td>
                            <td><select>
                                <option value="은행제출용">은행제출용</option>
                                <option value="???????">????????</option>
                                </select> </td>
                            <td><input type="text"/></td>
                            <td>1시간 내외</td>
                            <button>신청</button>                            
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>경력증명서</td>
                            <td><select>
                                <option value="은행제출용">은행제출용</option>
                                <option value="???????">????????</option>
                                </select> </td>
                            <td><input type="text"/></td>
                            <td>1시간 내외</td>
                            <button>신청</button>                            
                        </tr>
                        <tr>
                            <td>1</td>
                            <td>강의경력증명서</td>
                            <td><select>
                                <option value="은행제출용">은행제출용</option>
                                <option value="???????">????????</option>
                                </select> </td>
                            <td><input type="text"/></td>
                            <td>1시간 내외</td>
                            <button>신청</button>                            
                        </tr>
                    </tbody>
                </table>
            </div>
        </motion.div>
    );
}

export default ApplyCertiDoc;