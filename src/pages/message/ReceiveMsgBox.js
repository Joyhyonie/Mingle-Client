import { motion } from "framer-motion"

function ReceiveMsgBox () {

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ ease: "easeOut", duration: 0.5 }}>
            받은 쪽지함 컨텐츠😇
        </motion.div>
    );
}

export default ReceiveMsgBox;