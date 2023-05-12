/* 행정 직원의 학사 일정 관리 */
import { motion } from "framer-motion"

function AcademicSchedule () {

    return (
        <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ ease: "easeOut", duration: 0.5 }}
        >
            학사 일정 관리 🐛
        </motion.div>
    );
}

export default AcademicSchedule;