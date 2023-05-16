import { motion } from "framer-motion"

function BoardModify () {

    return (
        <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ ease: "easeOut", duration: 0.5 }}
        >
        </motion.div>
    );
}

export default BoardModify;