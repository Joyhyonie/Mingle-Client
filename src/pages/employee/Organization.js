import { motion } from "framer-motion"

/* 조직도 */

function Organization () {

    return (
        <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ ease: "easeOut", duration: 0.5 }}
        >
            조직도 🎃
        </motion.div>
    );
}

export default Organization;