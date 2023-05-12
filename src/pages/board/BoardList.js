import { motion } from "framer-motion"

function BoardList () {

    return (
        <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ ease: "easeOut", duration: 0.5 }}
        >
            공지 게시판 🤡
        </motion.div>
    );
}

export default BoardList;