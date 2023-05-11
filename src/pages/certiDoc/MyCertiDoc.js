import { motion } from "framer-motion"

/* 모든 교직원의 '증명서 발급 이력' */

function MyCertiDoc () {

    return (
        <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ ease: "easeOut", duration: 0.5 }}
        >
            증명서 발급 이력 🤠
        </motion.div>
    );
}

export default MyCertiDoc;