import { motion } from "framer-motion"

/* 모든 교직원의 '증명서 발급 신청' */

function ApplyCertiDoc () {

    return (
        <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ ease: "easeOut", duration: 0.5 }}
        >
            증명서 발급 신청 😇
        </motion.div>
    );
}

export default ApplyCertiDoc;