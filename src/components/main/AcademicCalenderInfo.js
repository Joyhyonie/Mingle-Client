import { motion } from "framer-motion"

function AcademicCalenderInfo () {

    return (
        <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ ease: "easeOut", duration: 0.5 }}
        >
            학사 일정 정보야 !!!!!!!!!
        </motion.div>
    );
}

export default AcademicCalenderInfo;