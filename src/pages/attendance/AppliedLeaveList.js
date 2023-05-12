/* 행정직원의 '휴가 신청 내역' */
import { motion } from "framer-motion"


function AppliedLeaveList () {

    return (
        <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ ease: "easeOut", duration: 0.5 }}
        >
            휴가 신청 내역 🧸
        </motion.div>
    );
}

export default AppliedLeaveList;