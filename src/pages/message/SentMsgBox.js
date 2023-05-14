import { motion } from "framer-motion"

function SentMsgBox () {

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ ease: "easeOut", duration: 0.5 }}>
            보낸 쪽지함 컨텐츠🥳
        </motion.div>
    );
}

export default SentMsgBox;