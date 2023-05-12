import { motion } from "framer-motion"

function MyCalender () {

    return (
        <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ ease: "easeOut", duration: 0.5 }}
        >
            나의 캘린더!!!! 🧡 우와오아아아ㅗㅇ
        </motion.div>
    );
}

export default MyCalender;