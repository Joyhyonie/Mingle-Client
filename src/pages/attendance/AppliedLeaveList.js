/* 행정직원의 '휴가 신청 내역' */
import { motion } from "framer-motion"
import CommonCSS from "../../css/common/Common.module.css";


function AppliedLeaveList () {

    return (
        <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ ease: "easeOut", duration: 0.5 }}
        >
    <div>
          <p className={ CommonCSS.pageDirection }>근태관리 ▸ 휴가 신청 내역</p>
    </div>
        </motion.div>
    );
}

export default AppliedLeaveList;