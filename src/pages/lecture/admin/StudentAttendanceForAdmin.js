/* 행정직원의 '출결 및 성적 관리' */
import { motion } from "framer-motion"

function StudentAttendanceForAdmin () {

    return (
        <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ ease: "easeOut", duration: 0.5 }}
        >
            행정직원의 출결 및 성적 관리 💜
        </motion.div>
    );
}

export default StudentAttendanceForAdmin;