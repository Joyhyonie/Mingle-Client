/* 행정직원의 '과목 관리' */
import { motion } from "framer-motion"
import SubjectListCSS from '../../../css/SubjectList.module.css'

function SubjectList () {

    return (
        <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ ease: "easeOut", duration: 0.5 }}
        >
            <div className={SubjectListCSS.SubjectList}>
                <table className={SubjectListCSS.SubjectListTable}>
                    <colgroup>
                    <col width="10%"/>
                    <col width="10%"/>
                    <col width="10%"/>
                    <col width="40%"/>
                    <col width="20%"/>
                    <col width="20%"/>                    
                    </colgroup>
                    <thead>
                        <tr>
                            <th><input type="checkbox"/></th>
                            <th>과목코드</th>
                            <th>학과명</th>
                            <th>과목명</th>
                            <th>이수구분</th>
                            <th>학점</th>
                            <th></th> <br/>
                            <br></br>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><input type="checkbox"/></td>
                            <td>asd</td>
                            <td>asd</td>
                            <td>asd</td>
                            <td>asd</td>
                            <td>1</td>
                            <button>수정</button>                            
                        </tr>
                    </tbody>
                </table>
            </div>
        </motion.div>
    );
}

export default SubjectList;