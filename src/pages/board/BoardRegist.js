import { motion } from "framer-motion"
import CommonCSS from '../../css/common/Common.module.css'

function BoardRegist () {

    return (
        <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ ease: "easeOut", duration: 0.5 }}
        >
            <p className={ CommonCSS.pageDirection }>공지사항 ▸ 공지 등록</p>
        </motion.div>
    );
}

export default BoardRegist;