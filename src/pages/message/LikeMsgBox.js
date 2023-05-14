import { motion } from "framer-motion"

function LikeMsgBox () {

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ ease: "easeOut", duration: 0.5 }}>
            중요 쪽지함 컨텐츠🤗
        </motion.div>
    );
}

export default LikeMsgBox;