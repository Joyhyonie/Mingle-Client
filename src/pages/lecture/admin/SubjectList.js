/* 행정직원의 '과목 관리' */
import { motion } from "framer-motion"

function SubjectList () {

    return (
        <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ ease: "easeOut", duration: 0.5 }}
        >
            과목관리 🐥
        </motion.div>
    );
}

export default SubjectList;