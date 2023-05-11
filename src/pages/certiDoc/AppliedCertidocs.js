import { motion } from "framer-motion"

/* 행정직원의 '증명서 발급 신청 내역' */

function AppliedCertidocs () {

    return (
        <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ ease: "easeOut", duration: 0.5 }}
        >
            증명서 발급 신청 내역 😍
        </motion.div>
    );
}

export default AppliedCertidocs;