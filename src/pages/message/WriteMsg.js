import { motion } from "framer-motion"

function WriteMsg () {

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ ease: "easeOut", duration: 0.5 }}>
            쪽지 작성 컨텐츠🤡
        </motion.div>
    );
}

export default WriteMsg;