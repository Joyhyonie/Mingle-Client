/* 행정직원의 '교직원 근태 기록' */
import { motion } from "framer-motion"


function EmployeeAttendance () {

    return (
        <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ ease: "easeOut", duration: 0.5 }}
        >
            교직원 근태 기록 ✨
        </motion.div>
    );
}

export default EmployeeAttendance;