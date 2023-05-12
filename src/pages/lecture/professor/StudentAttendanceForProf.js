/* 교수의 '출결 및 성적 관리' */
import { motion } from "framer-motion"

function StudentAttendanceForProf () {

    return (
        <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ ease: "easeOut", duration: 0.5 }}
        >
            교수의 출결 및 성적 관리 💜
        </motion.div>
    );
}

export default StudentAttendanceForProf;