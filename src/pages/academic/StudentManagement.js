/* 행정직원의 '학생 관리' */
import { motion } from "framer-motion"

function StudentManagement () {

    return (
        <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ ease: "easeOut", duration: 0.5 }}
        >
            학생 관리 🕺
        </motion.div>
    );
}

export default StudentManagement;