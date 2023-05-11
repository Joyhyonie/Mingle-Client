import { motion } from "framer-motion"

function Mypage () {

    return (
        <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ ease: "easeOut", duration: 0.5 }}
        >
            마이페이지 🥳
        </>
    );
}

export default Mypage;