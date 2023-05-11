import { motion } from "framer-motion"

function Main () {

    return (
        <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ ease: "easeOut", duration: 0.5 }}
        >
            메인 🧡 우와오아아아ㅗㅇ
        </motion.div>
    );
}

export default Main;