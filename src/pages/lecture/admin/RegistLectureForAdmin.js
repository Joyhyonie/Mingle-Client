/* 행정직원의 '강의 개설' */
import { motion } from "framer-motion"

function RegistLectureForAdmin () {

    return (
        <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ ease: "easeOut", duration: 0.5 }}
        >
            행정직원의 강의 개설 👼
        </motion.div>
    );
}

export default RegistLectureForAdmin;